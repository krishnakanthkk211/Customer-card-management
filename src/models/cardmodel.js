const mongoose=require('mongoose')

const cardSchema=new mongoose.Schema({
    cardNumber:{
        type:String
    },
    cardType:{
        type:String,
        enum:["REGULAR","SPECIAL"]
    },
    customerName:{
        type:String
    },
    status:{
        type:String,
        default:'ACTIVE',
        enum:["ACTIVE","INACTIVE"],
        
       
    },
    customerID:{
        type:String,
        ref:"customer"
    },
},{timestamps:true})

module.exports=mongoose.model('card',cardSchema)