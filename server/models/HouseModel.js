const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HouseSchema = new Schema({
    title: String,
    price: Number,
    area: Number,
    decoration: String,
    buildTime: String,
    orientation: String,
    floor: Number,
    subway: String,
    perSquarePrice: Number,
    roomNum: Number,
    hallNum: Number,
    toiletNum: Number,
    propertyType: String,
    community: String,
    address: String,
    sellPoint: String,
    ownerMood: String,
    houseImg: [String], // 存储多图片路径
    createdAt: { type: Date, default: Date.now },
    isPublish: { type: Number, default: 0 }, // 0: 未发布, 1: 已发布
});

const HouseModel = mongoose.model('house', HouseSchema);
module.exports = HouseModel;