const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const userSchema  =new Schema({
    name : String,
    email : String,
    password : String,
    firstName:String,
    lastName : String,
    middleName : String,
    compagny : String,
    phone : Number,
    country : String,
    city : String,
    state : String,
    zip : Number,
    address : String,
});

module.exports=mongoose.model('User',userSchema);