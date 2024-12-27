const HouseModel = require('../../models/HouseModel');

const HouseService = {
    add: async (data) => {
        return await HouseModel.create(data);
    },

    getList: async ({ _id }) => {
        try {
            return _id ? HouseModel.find({ _id }) : HouseModel.find({});
        } catch (error) {
            console.error('houseService.getList error:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            return await HouseModel.findById(id);
        } catch (error) {
            console.error('houseService.getById error:', error);
            throw error;
        }
    },

    publish: async ({ _id, isPublish }) => {
        try {
            return await HouseModel.updateOne(
                { _id },
                { isPublish }
            );
        } catch (error) {
            console.error('houseService.publish error:', error);
            throw error;
        }
    },

    delList: async ({ _id }) => {
        try {
            return await HouseModel.deleteOne({ _id });
        } catch (error) {
            console.error('houseService.delList error:', error);
            throw error;
        }
    },

    update: async (id, data) => {
        try {
            return await HouseModel.updateOne({ _id: id }, data);
        } catch (error) {
            console.error('houseService.update error:', error);
            throw error;
        }
    },
};

module.exports = HouseService;