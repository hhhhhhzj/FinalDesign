const HouseModel = require('../../models/HouseModel');

const HouseService = {
    add: async (data) => {
        return await HouseModel.create(data);
    },

    getList: async ({_id}) => {
        try {
            return _id? HouseModel.find({_id}) : HouseModel.find({})
        } catch (error) {
            console.log('houseService.getList error: ', error);
        }
    },

    getById: async (id) => {
        try {
            return await HouseModel.findById(id);
        } catch (error) {
            console.log('houseService.getById error: ', error);
        }
    },

    publish: async ({ _id, isPublish }) => {
        try {
            return HouseModel.updateOne(
                {
                    _id,
                },
                {
                    isPublish,
                }
            );
        } catch (error) {
            console.log('houseService.publish error: ', error);
        }
    },

    delList: async ({ _id }) => {
        return HouseModel.deleteOne({
            _id,
        });
    },
};

module.exports = HouseService;