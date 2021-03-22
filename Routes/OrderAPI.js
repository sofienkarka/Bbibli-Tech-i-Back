const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const Orders=require('../Schemas/OrderSchema');
const Product=require('../Schemas/LivreSchema');
const user = require('../Schemas/userSchema')
const orderid=require('order-id') ('mysecret')
const idOrder=orderid.generate()
const fs = require('fs');
const path = require ('path');
const ejs = require('ejs');

const {authMiddleWare}=require('../JwtConfig/jwt')
//avoir la liste de toutes les commandes

router.get('/Orders',async(req,res)=>{
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

router.post('/addOrder',async(req,res)=>{

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

router.put('/UpdateOrder/:orderId',(req,res)=>{

Orders.findById(req.params.orderId).populate("userId").then(order=>{
    order.status=req.body.status;
    return order.save()
}).then(order=>{
   
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'nasserimen102@gmail.com',
          pass: '14305193Gmail' // naturally, replace both with your real credentials or an application-specific password
        }
      
})

const template = fs.readFileSync(path.resolve('./mail', 'mail.html'), {encoding: 'utf-8'});

const html = ejs.render(template, {
  name: order.userId.name,
  NumOrder:order.NumOrder,
  date:order.date,
  Total : order.Total,
  status : order.status,
  titre : order.titre,
  productCount : order.productCount,
  prix : order.prix,
  productCount : order.productCount


});
      const mailOptions = {
        from: 'nasserimen102@gmail.com',
        to:  order.userId.email,
        subject: 'Invoices due',
        text: 'Dudes, we really need your money.',
        html :html
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log("e");
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          
        }
      });
}
  
).then(()=>{
    res.json("message envoyé")
}).catch(err=>{
    console.log(err);
    res.json(err)
})

})


router.get('/UserOrders',(req,res)=>{
    console.log(req.body);

})

module.exports = router;
