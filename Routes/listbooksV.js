const express = require('express');
const router = express.Router();
const Livres=require('../Schemas/LivreSchema');

router.get('listVendus', async (req,res)=>{
    const listVendus = await Livres.find(livre=>livre.etat=='vendu');
    if(listVendus.length=null){
        res.json('liste des livres vendus est vide')
    }else{
    res.json({message:'listes des livres vendus',listVendus})
}
});

module.exports=router;