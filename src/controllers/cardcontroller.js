const cardmodel=require('../models/cardmodel')
const cardgen=require('card-number-generator')
const createcard=async (req,res)=>{
    const data=req.body
    
    data.cardNumber=cardgen({issuer:'MasterCard'})
    const card=await cardmodel.create(data)
    res.send(card)
}

const getcards=async (req,res)=>{
    const data=req.query
    console.log(data.cardNumber)
}
module.exports={createcard,getcards}