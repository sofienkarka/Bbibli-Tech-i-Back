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
            if(result=true){
                const data ={
                    email:userConnected.email,
                    userId:userConnected._id
                }
                const createdToken = jwt.sign(data,'secret',{expiresIn:"1m"});
                res.json({user:userConnected,token:createdToken});
            }
            else{
                res.json({message:"user not found"})
            }
        })
     }
});

router.get('/getAllUsers', async (req,res)=>{
    const get = await Users.find()
    res.json(get)
})
    
  

module.exports = router