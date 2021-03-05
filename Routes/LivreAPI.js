const express = require('express');
const router = express.Router();
const Livres=require('../Schemas/LivreSchema');
const multer = require('multer');
const path=require('path');


//Upload Image

const storage = multer.diskStorage({
destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
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
  

//Ajouter un nouveau livre
router.post('/addLivre',uploads.single('image'),async(req,res)=>{
    const livre = new Livres({
        titre: req.body.titre,
        auteur:req.body.auteur,
        maisonEdition:req.body.maisonEdition,
        anneeEdition:req.body.anneeEdition,
        categorie:req.body.categorie,
        langue:req.body.langue,
        images:req.file.path,
        stock:req.body.stock,
        etat:req.body.etat
    })
 
   await livre.save();

    res.json({
        livre: livre,
        message:"Livre créé avec succes"
    })
})

//Avoir la liste de tous les livres
router.get('/Livres',async(req,res)=>{
  const founds= await Livres.find()
    res.json({
        message:'Liste de tous les livres affichée avec succés', founds
    })
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



module.exports = router;
