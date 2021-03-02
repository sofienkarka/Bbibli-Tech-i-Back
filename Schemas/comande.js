const mongoose = require('mongoose')
const schema = mongoose.Schema 

const commande = new schema({
    nama : String,
    phoneNumber : String,
    email : String,
    adress : String,
    title : String,
    date : Number,
    quantity : Number
})
module.exports = mongoose.model('commande' , commande)