//const {Router} = require("express")
//named expo {}

const express = require("express")
const authrouter = new express.Router();

const LoginModel = require("../Model/Login.model");

var bcrypt = require("bcryptjs")
var jwt = require("jsonwebtoken")

 require("dotenv").config();

 authrouter.post("/signup",async(req,res)=>{
    const {name,email,gender,role,age,password}=req.body;

     //check already signupUser
     const AlreadySignup = await LoginModel.find({email})
     console.log("Already User",AlreadySignup);

     if(AlreadySignup.length > 0){
        return res.send("Already User Exist");
     }

    //  *********************************
    bcrypt.hash(password,5,function(err,hash){
        if(err){
            return res.send(401).send("please try again later");
        }else{
            const Newuser = new LoginModel({email,password,age,name,gender,role})
            Newuser.save()
            res.status(200).send({message:"signup Successfull",Newuser})
        }
    })
})


authrouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;

    const FindUser = await LoginModel.findOne({email});
    console.log("userFind the login",FindUser);

    if(FindUser){
        let hash = FindUser.password;
        let userid =FindUser._id;
        let name=FindUser.name;
        let role = FindUser.role

        bcrypt.compare(password,hash,function(err,resul){
            if(err){
                return res.status(404).send("Invalid Credential Please Signup First") 
            }else{
                var token = jwt.sign({ email, userid }, process.env.SECRET_KEY);
                console.log(token)
                return res.status(200).send({message:"Login Successfull",FindUser,token,name,role})
            }
        })
    }else{
        return res.status(404).send("Invalid Credential")
    }

})

module.exports=authrouter;
