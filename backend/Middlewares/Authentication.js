
const jwt= require("jsonwebtoken");
require("dotenv").config()

const authentication = (req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(401).send("Login Again");

    }
    const user_token = req.headers.authorization;
    jwt.verify(user_token, process.env.SECRET_KEY,function(err,decode){
        if(err){
            return res.status(401).send("Login again invalid credential...")
        }
        req.body.email=decode.email;
        req,body.userid=decode.userid;
        next()
    });
}

module.exports=authentication