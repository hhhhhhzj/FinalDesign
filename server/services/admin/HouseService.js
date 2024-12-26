const HouseModel = require('../../models/HouseModel');

const HouseService = {
    add: async (data) => {
        return await HouseModel.create(data);
    },

    getList: async () => {
        try {
            
            return HouseModel.find({})
        } catch (error) {
            console.log('houseService.getList error: ', error);
            
        }
    },

    publish: async ({_id,isPublish})=> {
        try {
            return HouseModel.updateOne({
               _id
            },{
               isPublish,
            })
        } catch (error) {
            console.log('houseService.publish error: ', error);
            
        }
   }
};

module.exports = HouseService;