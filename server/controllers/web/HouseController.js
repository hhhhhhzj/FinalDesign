const HouseService = require('../../services/web/HouseService');

const HouseController = {

    getList: async (req, res) => {
        try {
            
          const { page = 1, pageSize = 10, filters = "{}" } = req.query;
          const skip = (page - 1) * pageSize;
          const parsedFilters = JSON.parse(filters);
          console.log("接收到的筛选条件:", parsedFilters);
          // 构建查询条件
          const query = { isPublish: 1 };
          if (parsedFilters['区域']) query.address = parsedFilters['区域'];
          if (parsedFilters['地铁']) query.subway = parsedFilters['地铁'];
          if (parsedFilters['朝向']) query.orientation = parsedFilters['朝向'];
          if (parsedFilters['装修']) query.decoration = parsedFilters['装修'];
          if (parsedFilters['价格']) {
            const [min, max] = parsedFilters['价格']
              .replace(/万/g, "") // 去掉 "万"
              .replace("<", "0-") // 处理 "<" 为区间
              .split("-");
            query.price = { $gte: parseFloat(min) || 0 }; // 最小值默认为 0
            if (max) query.price.$lte = parseFloat(max); // 如果有最大值，加入 $lte 条件
          }
          if (parsedFilters['面积']) {
            const [min, max] = parsedFilters['面积']
              .replace(/㎡/g, "")
              .replace("<", "0-")
              .split("-");
            query.area = { $gte: +min || 0, $lte: +max || Infinity };
          }
          if (parsedFilters['房型']) {
            // 提取数字部分，例如 "3室" 提取为 3
            const match = parsedFilters['房型'].match(/\d+/);
            if (match) {
              const roomNum = parseInt(match[0], 10); // 转换为数字
              query.roomNum = roomNum;
            }
          }
    
          // 调用 Service 获取数据
          const total = await HouseService.count(query);
          const data = await HouseService.getList(query, skip, +pageSize);
    
          res.send({
            ActionType: 'ok',
            data,
            total,
          });
        } catch (error) {
          console.error('web获取房源列表失败:', error);
          res.status(500).send({ ActionType: 'error', message: '获取房源列表失败' });
        }
      },


};

module.exports = HouseController;