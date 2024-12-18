const { json } = require("express");
const jsonwebtoken = require("jsonwebtoken");
const secret = "kerwin";
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

module.exports = JWT;