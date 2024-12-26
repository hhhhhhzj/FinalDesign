const HouseModel = require('../../models/HouseModel');

const HouseServices = {
    add: async (data) => {
        return await HouseModel.create(data);
    },

    getList: async () => {
        try {
            
            return HouseModel.find({})
        } catch (error) {
            console.log('houseService.getList error: ', error);
            
        }
    }
};

module.exports = HouseServices;