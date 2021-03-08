const express = require('express');
const router = express.Router();
const Category=require('../Schemas/CategorySchema');

//add category
router.post('/addCategory',async(req,res)=>{
const category= new Category({
    name:req.body.name
}) 
category.save()
res.json(category)
})
module.exports = router;
