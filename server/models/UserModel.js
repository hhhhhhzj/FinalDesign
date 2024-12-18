const mongoose = require('mongoose');
const schema = mongoose.Schema;
//user模型===>user集合
const UserType = {
    username:String,
    password:String,
    phone:String,
    gender:Number, //性别 0,1,2
    introduction:String,//简介
    avatar:String,//头像
    role:Number,//1:管理员 2:普通用户
}
const UserModel = mongoose.model('user',new schema(UserType))

module.exports = UserModel;