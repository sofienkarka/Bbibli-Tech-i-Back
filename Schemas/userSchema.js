const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const userSchema  =new Schema({
    name : String,
    email : String,
    password : String,
    lastname : String,
    middleName : String,
    compagny : String,
    phone : Number,
    country : String,
    city : String,
    stateprovince : String,
    zippostalcode : Number,
    adress : String
});

module.exports=mongoose.model('User',userSchema);