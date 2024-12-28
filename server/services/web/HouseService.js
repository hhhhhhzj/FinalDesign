const HouseModel = require('../../models/HouseModel');

const HouseService = {
    getList: async ({ skip = 0, limit = 10 }) => {
        try {
            return await HouseModel.find({ isPublish: 1 }) // 只查询已发布的数据
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 }); // 按创建时间降序排列
        } catch (error) {
            console.error('web houseService.getList error:', error);
            throw error;
        }
    },

    count: async () => {
        try {
            return await HouseModel.countDocuments({ isPublish: 1 }); // 统计总条数
        } catch (error) {
            console.error('houseService.count error:', error);
            throw error;
        }
    },
};

module.exports = HouseService;