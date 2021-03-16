const mongoose = require('mongoose');
const Schema =mongoose.Schema
const LivreSchema =new Schema({
    titre:{type:String,required:true},
    auteur:{type:String,required: true},
    maisonEdition:{type:String,required: true},
    anneeEdition:{type:Number,required:true},
    categorie:{type:String,required:true},
    langue:{type:String,required:true},
    images: {type:String,required:false},
    stock:{type:Number,required:true},
    prix:{type:Number,required:true},
    type:{type:String,required:true},
    cardCount:{type:Number,default:1}
})
module.exports= mongoose.model('Livres', LivreSchema);