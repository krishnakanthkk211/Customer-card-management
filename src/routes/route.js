const express=require('express')
const router=express.Router()
const customercontroller=require('../controllers/customercontroller')
const cardcontroller=require('../controllers/cardcontroller')


router.post('/customer',customercontroller.createcustomer)
router.get('/customer',customercontroller.getcustomer)
router.put('/customer/:customerID',customercontroller.updatecustomer)
router.delete('/customer',customercontroller.deletecustomer)

router.post('/card',cardcontroller.createcard)
router.get('/card',cardcontroller.getcards)
module.exports=router