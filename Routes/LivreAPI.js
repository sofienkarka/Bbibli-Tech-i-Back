const express = require('express');
const router = express.Router();
const Livres=require('../Schemas/LivreSchema');
const multer = require('multer');
// const path=require('path');
const formidable = require('formidable');


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
  var form = new formidable.IncomingForm();
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
      etat:req.body.etat
  })

  livre.save();
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
router.put('/UpdateLivre/:id',async(req,res)=>{
const UpdatedLivre=await Livres.findByIdAndUpdate(req.params.id,req.body,{new:true})
res.json({
    message:'Livre updated avec succes',UpdatedLivre
})
console.log(UpdatedLivre);
})

router.post('/test',async(req,res)=>{
  var form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ fields, files }, null, 2));
  });
})
module.exports = router;
 