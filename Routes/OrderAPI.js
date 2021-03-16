const express = require('express');
const router = express.Router();
const Orders=require('../Schemas/OrderSchema');
const Product=require('../Schemas/LivreSchema');
const orderid=require('order-id') ('mysecret')
const idOrder=orderid.generate()

//avoir la liste de toutes les commandes

router.get('/Orders',async(req,res)=>{
 await Orders.find();
 res.json({message:'toutes les commandes chargées avec succés'})

})

router.get('/Orders/:id',async(req,res)=>{
    found=await Orders.findById(req.params.id)
    res.json(found)
})

router.post('/addOrder',async(req,res)=>{

const order = new Orders({
    NumOrder:idOrder,
    Total:req.body.total,
    
    status:"en cours",
    DeliveryMethod:req.body.DeliveryMethod,
    CardNumber:req.body.CardNumber,
    userId:req.body.userId
})
products=[]

req.body.products.forEach(e=>{
    var obj={product:e._id,productCount:e.cardCount}
    products.push(obj)
})
order.products=products
await order.save();
console.log(order.products);

req.body.products.forEach(async (element) => {
  await  Product.findByIdAndUpdate(element._id,{stock:element.stock-element.cardCount})
});
  
   res.json('commande ajoutee')
})










module.exports = router;
