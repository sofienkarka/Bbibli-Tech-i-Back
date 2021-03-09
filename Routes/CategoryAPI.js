const express = require('express');
const { findById } = require('../Schemas/CategorySchema');
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

router.get('/getCategory', async(req,res)=>{
    const getCategory = await Category.find()
    res.json(getCategory)
})
 router.get('/getbyid/:id' , async (req,res)=>{
     const getbyid = await Category.findById(req.params.id)
     res.json({messgae : 'categry bu ID geted'})
 })
 router.put('/putCategory/:id' , async(req,res)=>{
     const putCtaegory = await Category.findByIdAndUpdate(req.params.id , req.body, {new : true})
     res.json({message : 'Category updated!'})
 })

router.delete('/deleteCategory/:id' , async(req,res)=>{
    const deleteCategory = Category.findByIdAndDelete(req.params.id)
    res.json({message : 'Category deleted!'})
})
module.exports = router;
