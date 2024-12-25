const HouseModel = require('../../models/HouseModel');

const HouseServices = {
    add: async (data) => {
        return await HouseModel.create(data);
    },
};

module.exports = HouseServices;