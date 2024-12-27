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
            const newImages = data.newImages || [];
    
            // 构造新的图片数组：现有图片 + 新上传的图片
            const house = await HouseModel.findById(id); // 获取现有图片数组
            if (!house) {
                throw new Error(`房源未找到，ID: ${id}`);
            }
            const updatedImages = Array.from(
                new Set([...house.houseImg.filter((img) => !newImages.includes(img)), ...newImages])
            );
    
            // 更新文档
            const updateData = {
                ...data,
                houseImg: updatedImages,
            };
            delete updateData.newImages; // 删除不需要的字段
    
            // 使用 `updateOne` 直接更新，避免版本号冲突
            return await HouseModel.updateOne({ _id: id }, updateData);
        } catch (error) {
            console.error('更新房源失败:', error);
            throw error;
        }
    }
};

module.exports = HouseService;