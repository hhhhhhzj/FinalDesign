const HouseModel = require('../../models/HouseModel');

const HouseService = {
    getList: async (query, skip = 0, limit = 10) => {
        try {
          return await HouseModel.find(query)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        } catch (error) {
          console.error('web houseService.getList error:', error);
          throw error;
        }
      },
    
      count: async (query) => {
        try {
          return await HouseModel.countDocuments(query);
        } catch (error) {
          console.error('houseService.count error:', error);
          throw error;
        }
      },

      getDetail: async ({ _id }) => {
        try {
            const query = { isPublish: 1 }; // 只查询 isPublish 为 1 的数据
            if (_id) {
                query._id = _id; // 如果有 _id 参数，则进一步过滤
            }
            return await HouseModel.find(query);
        } catch (error) {
            console.error('houseService.getDetail error:', error);
            throw error;
        }
    },
    getSimilarHouses: async (query, limit = 5) => {
      try {
        return await HouseModel.find(query).limit(limit).sort({ createdAt: -1 });
      } catch (error) {
        console.error('houseService.getSimilarHouses error:', error);
        throw error;
      }
    },
  };

module.exports = HouseService;