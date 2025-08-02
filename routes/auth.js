const express = require("express")
var router = express.Router();
const userModel = require("../models/users.model");
var bcrypt = require("bcrypt")
var jwt = require("jsonwebtoken");

router.post('/register',async function(req,res,next){
    try {
           const {name,email,password} = req.body; 
 const existinguser = await userModel.findOne({email});

    if(existinguser){
      return  res.status(400).json({error:"User already exists"})
    }

if (!name || !email || !password){
    return res.status(400).json({error:"Missing fields"})
}
if(password.length<7){
    return res.status(400).json({error:"Invalid format"})
}

let hashpassword = await bcrypt.hash(password,10)
    let newUser = await userModel.create({
            name,
            email,
            password:hashpassword
           })

           const token = jwt.sign(
            {userId:newUser.id,email:newUser.email},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
           )

           res.json({
            message:"Registered successfully",
            token,
            user:{
                name:newUser.name,
                email:newUser.email,
                userId:newUser.id
            }
           })
           

    } catch (error) {
     return   res.status(500).json({error:"Server error"})
    }
})


router.post('/login',async function(req,res,next){
    try {
        const{email,password} = req.body;

        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({error:"User not found"})
        }

        let isPassword = await bcrypt.compare(password,user.password);
        if(!isPassword){
             return res.status(400).json({error:"wrong password"})
        }

        let token = jwt.sign(
            {userId:user.id,email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )
        
res.json({
    message:"logged in successfull",
    token,
    user
   
})

    } catch (error) {
       return  res.status(500).json({error:"Server error"})
    }
})

module.exports = router;