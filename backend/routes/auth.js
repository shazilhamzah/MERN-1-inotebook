const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = "inotebook@secret86"
var fetchuser = require('../middleware/fetchuser'); 

//? CREATE A USER USING: POST "/api/auth/createuser" WITH VALIDATIONS - NO LOGIN REQUIRED
router.post('/createuser', [
    body('email', "Enter a valid email").isEmail(),
    body('name', "Enter a valid name").isLength({ min: 5 }),
    body('password', "Enter a valid password").isLength({ min: 8 }),
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }


    // CHECK WHETHER EMAIL ALREADY EXIST
    try {
        let user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({error:"Sorry a user with this email already exists!"})
        }

        // BCRYPTING + SALT
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
        
        // CREATING A USER HERE
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        });


        //CONFIGURING JSON WEB TOKEN
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        res.json(authToken);
    } 
    
    // CATCHING ERROR
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured!");
    }
    
});


//? AUTHENTICATING A USER USING: POST "/api/auth/login" - NO LOGIN REQUIRED
router.post('/login',[
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password can not be blank").exists(),
],async(req,res)=>{

    // ERROR VALIDATION FOR EMAIL AND PWD
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    // VERIFYING AUTHENTICATION
    const {email,password} = req.body;
    try {
        // CHECKING EMAIL EXISTANCE
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Please try to login with correct credentials!"});
        } 

        // MATCHING CORRECT PASSWORD
        const passwordComapare = await bcrypt.compare(password,user.password);
        if(!passwordComapare){
            return res.status(400).json({error:"Please try to login with correct credentials!"});
        }

        // GAINING JSON WEB TOKEN ON AUTHENTICATION
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        res.json(authToken);
    }

    // CATCHING ERROR
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }   
})


//? GETTING USER DATA: POST "/api/auth/getuser" - LOGIN REQUIRED
router.post('/getuser',fetchuser,async(req,res)=>{
    try {
        const userID = req.user.id;
        const user = await User.findById(userID).select("-password")  
        res.send(user);
    } 


    // CATCHING ERROR
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }  
})



module.exports = router;













//? BASICS:
// CHICKEN TERIAKI
// CHEESE
// ORIGANO BREAD
//! BLACK OLIVES & CORN


//? SAUCES:
// THOUSAND ISLAND
// CHIPOTLE
// HONEY MUSTARD