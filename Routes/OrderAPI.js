const express = require('express');
const router = express.Router();
const Orders=require('../Schemas/OrderSchema');
const Product=require('../Schemas/LivreSchema');
const orderid=require('order-id') ('mysecret')
const idOrder=orderid.generate()
const {authMiddleWare}=require('../JwtConfig/jwt')
//avoir la liste de toutes les commandes

router.get('/Orders',authMiddleWare,async(req,res)=>{
 orders=await Orders.find().populate({
     path:'products',
     populate:{
         path:'product',
         model:'Livres'
     }
 });
 res.json(orders)

})

router.get('/Orders/:id',async(req,res)=>{
    found=await Orders.findById(req.params.id)
    res.json(found)
})

router.post('/addOrder',authMiddleWare,async(req,res)=>{

const order = new Orders({
    NumOrder:idOrder,
    Total:req.body.total,
    date:req.body.date,
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

router.put('/UpdateOrder/:id',authMiddleWare,async(req,res)=>{
    console.log(req.body);
Orders.findById(req.params.id).then(order=>{
    order.status=req.body.status;
    order.save()
}).then(res.json("commande on hold"))

});

router.get('/UserOrders',(req,res)=>{
    console.log(req.body);

})







module.exports = router;
