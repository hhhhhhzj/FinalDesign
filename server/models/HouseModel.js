const mongoose = require('mongoose');
const schema = mongoose.Schema;
//user模型===>user集合
const HouseType = {
    title: String,
    price: Number,
    area: Number,
    decoration: String,
    buildTime
}
const HouseModel = mongoose.model('house',new schema(NewsType))
module.exports = HouseModel;