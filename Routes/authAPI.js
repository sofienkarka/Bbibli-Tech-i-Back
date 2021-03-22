const express = require('express');
const router = express.Router();
const passport = require('passport')
const Users = require('../Schemas/userSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require ('bcrypt');
saltRounds = 10


router.post('/register', async (req,res)=>{
    const user =await Users.findOne({email:req.body.email})
    if(!user){
        await bcrypt.hash(req.body.password,saltRounds, async (err,hash)=>{
            const newUser = await Users.create({
                name:req.body.name,
                email:req.body.email,
                password:hash
            });
            res.json(newUser);
            }); 
            
    }
    else {
        res.json('user already exist');
    }
   
});



router.post('/login', async(req,res) =>{
    const userConnected = await Users.findOne(
      {email:req.body.email});
    if(!userConnected){  
     return res.json({message:'email or password not found'})
      
    }
    else{
        bcrypt.compare(req.body.password,userConnected.password, function(err,result){
            if(result){
                const data ={
                    email:userConnected.email,
                    userId:userConnected._id
                }
                const createdToken = jwt.sign(data,'secret',{expiresIn:"1h"});
                res.json({userName:userConnected.name,user:userConnected,token:createdToken,userId:userConnected._id});
            }
            else{
                res.json({message:"user not found"})
            }
        })
     }
});

router.post('/userSuit',async(req,res)=>{
    console.log(req.body)
   await Users.findOne({email:req.body.email}).then(user=>{
       user.firstName=req.body.firstName,
       user.lastName=req.body.lastName,
       user.middleName=req.body.middleName,
       user.compagny=req.body.middleName,
       user.phone=req.body.phone,
       user.country=req.body.country.name,
       user.city=req.body.city,
       user. state=req.body. state,
       user.zip=req.body.zip,
       user.address=req.body.address;
       return user.save()
   }).then(res.json('user updated')) 
    
})
router.get('/User/:id',async(req,res)=>{
    console.log(req.body);

const found=await Users.findById(req.params.id)
res.json(found)
})

    
  

module.exports = router