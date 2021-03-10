const express = require('express');
const router = express.Router();
const Livres=require('../Schemas/LivreSchema');
const multer = require('multer');
// const path=require('path');


//Upload Image

const storage = multer.diskStorage({
destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    // const data = JSON.parse(req.body)
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file

  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'||file.mimetype=='image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const uploads = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });
  
  // uploads.single('image'),
//Ajouter un nouveau livre
router.post('/addLivre',uploads.single('images'), async(req,res)=>{
console.log(req.body);

   //form.parse(req, (err, fields, files) => {

    const livre = new Livres({
      titre: req.body.titre,
      auteur:req.body.auteur,
      maisonEdition:req.body.maisonEdition,
      anneeEdition:req.body.anneeEdition,
      categorie:req.body.categorie,
      langue:req.body.langue,
      images:req.file.path,
      stock:req.body.stock,
      prix:req.body.prix,
      type:req.body.type
  })

  await livre.save();
   // res.writeHead(200, { 'content-type': 'application/json' });
    res.json(livre);
  //}); 
   
})

//Avoir la liste de tous les livres
router.get('/Livres',async(req,res)=>{
  const founds= await Livres.find()
    res.json(
       founds
    )
})

//Avoir un live avec son id
router.get('/Livres/:id',async(req,res)=>{
    const found= await Livres.findById(req.params.id)
      res.json({
          message:'Livre trouvé avec succés', found
      })
  })

  //Supprimer un livre de la base
  router.delete('/delLivre/:id',async(req,res)=>{
   await Livres.findByIdAndDelete(req.params.id)
   res.json({
    message:'Livre supprimé avec succés'
})
  })

  //Update Données livre
router.put('/UpdateLivre/:id',uploads.single('images'),async(req,res)=>{
 
Livres.findById(req.params.id).then(livre=>{
    livre.titre=req.body.titre,
    livre.auteur=req.body.auteur,
    livre.maisonEdition=req.body.maisonEdition,
    livre.anneeEdition=req.body.anneeEdition,
    livre.categorie=req.body.categorie;
    livre.langue=req.body.langue,
    livre.stock=req.body.stock,
    livre.prix=req.body.prix,
    livre.type=req.body.type
    if(req.file){
      livre.images=req.file.path
             }
             else if(req.file=='undefined'){
                livre.images=req.body.images

             };
    return livre.save()
}).then(
  res.json("livre updated"),
)
  })


module.exports = router;
 