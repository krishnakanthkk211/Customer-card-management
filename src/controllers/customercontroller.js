
const crypto=require('crypto')
const customermodel = require('../models/customermodel')
const { v4: uuidv4 } = require('uuid');


// const createcustomer = async function (req, res) {
    // const data = req.body
    // data.customerID=crypto.randomUUID()
    // console.log(data)
    // const result=await customermodel.create(data)
    // res.status(201).send({status:true,msg:result})
    const createcustomer = async function (req, res) {
        try {
    
            let data = req.body
    
            if (Object.keys(data).length == 0) {
                return res.status(400).send({ status: false, message: "Customer data required " })
            }
    
            let { firstName, lastName, mobileNumber, DOB, emailID, address } = data
    
    
            if (!firstName) return res.status(400).send({ status: false, message: "First name is mandatory" })
            if (!isValidString(firstName.trim())) return res.status(400).send({ status: false, message: "Not a valid first name " })
    
            if (!lastName) return res.status(400).send({ status: false, message: "Last name is mandatory" })
            if (!isValidString(lastName.trim())) return res.status(400).send({ status: false, message: "Not a valid last name" })
    
            if (!mobileNumber) return res.status(400).send({ status: false, message: "Mobile Number is mandatory" })
             if (!isValidPhone(mobileNumber)) return res.status(400).send({ status: false, msg: "Put a valid mobile number" })
            let findMobile = await customermodel.findOne({ mobileNumber: mobileNumber })
            if (findMobile) {
                return res.status(400).send({ status: false, message: "Mobile number already exists" })
            }
    
            if (!DOB) return res.status(400).send({ status: false, message: "DOB is mandatory" })
            if (!isValidDate(DOB)) return res.status(400).send({ status: false, message: "Please enter a valid DOB" })
    
            if (!emailID) return res.status(400).send({ status: false, message: "emailID is required" })
           if (!isValidEmailID(emailID)) return res.status(400).send({ status: false, message: "emailID is not Valid" })
            const findemailID = await customermodel.findOne({ emailID: emailID })
            if (findemailID) return res.status(400).send({ status: false, message: "emailID already exist " })
    
            if (!address) return res.status(400).status({ status: false, message: "Please enter address" })
    
         
            data.customerID=crypto.randomUUID()
    
            const customer = await customermodel.create(data)
    
            return res.status(201).send({ status: false, message: "success", data: customer })
        }
        catch (err) {
            return res.status(500).send({ status: false, message: err.message })
        }
    }


const getcustomer=async function(req,res){
    const status=req.query
    
    const customer=await customermodel.find(status)
    res.send(customer)

}
const updatecustomer=async function(req,res){
    const id=req.params.customerID
    const data=req.body
    const update=await customermodel.findOneAndUpdate({customerID:id},{data:data})
    res.send(update)
}

const deletecustomer=async function(req,res){
    const data=req.query
    const deleted=await customermodel.findOneAndDelete(data)
    res.send("deleted successfully")
}

module.exports={createcustomer,getcustomer,updatecustomer,deletecustomer}