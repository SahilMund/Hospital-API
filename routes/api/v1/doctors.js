const express=require('express');
const router=express.Router();

const {doctorController}=require('../../../controllers');


// Doctor Registration route 
router.post('/register',doctorController.register);

// Doctor Login route
router.post('/login',doctorController.login);


module.exports=router;