const mongoose = require('mongoose');
const Schema =mongoose.Schema
const OrderSchema =new Schema({
    NumOrder:{type:String,required:false},
    date:{type:String,required:false},
    Total:{type:Number},
    userId:{type:Schema.Types.ObjectId,ref:'User'},
    DeliveryMethod:{type:String,required:false},
    CardNumber:{type:Number,required:false},
    status:{type:String,required:false},
    products:[{product:{type:Schema.Types.ObjectId,ref:'Livres'},productCount:Number}]
})
module.exports= mongoose.model('Order', OrderSchema);