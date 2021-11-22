const db = require("../model/helper");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;


function userMustLoggedIn(req, res, next){
//check if there is the token
//there is an header called authorization
console.log(req.headers)
const token = req.headers["authorization"]?.replace(/^Bearer\s/, "");

if(!token){
    return res.status(401).send({message: "You have to log in first"});
  
}

//verify the token

jwt.verify(token, supersecret, (err, decoded) =>{
    console.log(token)
    if (err) {
        console.log(err)
        return res.status(401).send({message: 'Invalid token'});
    } else{

    req.user_id = decoded.user_id;//payload
    console.log("am i here", decoded)
    next();
    }
    
});
}

module.exports = userMustLoggedIn;