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

    removeImages: async (id, images) => {
        try {
            const house = await HouseModel.findById(id);
            if (house) {
                house.houseImg = house.houseImg.filter((img) => !images.includes(img));
                await house.save();
            }
        } catch (error) {
            console.log('houseService.removeImages error:', error);
        }
    },

    update: async (id, data) => {
        try {
            const house = await HouseModel.findById(id);
            if (house) {
                // 合并新图片和现有图片路径
                house.houseImg = [
                    ...house.houseImg.filter((img) => !data.newImages.includes(img)), // 保留未删除的图片
                    ...(data.newImages || []), // 添加新上传的图片
                ];
    
                // 更新其他字段
                Object.assign(house, data);
                delete house.newImages; // 防止保存新图片路径字段到数据库
                return await house.save();
            }
            return null;
        } catch (error) {
            console.error('更新房源失败:', error);
        }
    }
};

module.exports = HouseService;