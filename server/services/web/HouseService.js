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
      search: async (query) => {
        try {
          return await HouseModel.find(query).sort({ createdAt: -1 });
        } catch (error) {
          console.error("HouseService.search error:", error);
          throw error;
        }
      },
  };

module.exports = HouseService;