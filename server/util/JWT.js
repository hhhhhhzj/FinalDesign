const { json } = require("express");
const jsonwebtoken = require("jsonwebtoken");
const secret = "hzj";
const JWT = {
    generate(value,exprires){
        return jsonwebtoken.sign(value,secret,{expiresIn:exprires})
    },
    verify(token){
        try {
            return jsonwebtoken.verify(token,secret)
        } catch (error) {
            return false
        }
    }
}
const token = JWT.generate({name:"huangzhuji"},'10s')
console.log(JWT.verify(token));
setTimeout(()=>{
    console.log(JWT.verify(token));
},10000)
module.exports = JWT;