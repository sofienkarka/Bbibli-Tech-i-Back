const express = require('express')
const router = express.Router()
const commande = require('../Schemas/comande')



router.post('/addbook' , async(req , res) =>{
     const add = await commande.create(req.body)
     console.log("imen");
     res.json(add)
})

module.exports = router