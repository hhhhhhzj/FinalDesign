const HouseService = require('../../services/web/HouseService');

const HouseController = {

  getList: async (req, res) => {
    try {
      const { page = 1, pageSize = 10, filters = "{}", keyword = "" } = req.query;
      const skip = (page - 1) * pageSize;
      const parsedFilters = JSON.parse(filters);

      const query = { isPublish: 1 };

      if (parsedFilters['区域']) query.address = parsedFilters['区域'];
      if (parsedFilters['地铁']) query.subway = parsedFilters['地铁'];
      if (parsedFilters['朝向']) query.orientation = parsedFilters['朝向'];
      if (parsedFilters['装修']) query.decoration = parsedFilters['装修'];
      if (parsedFilters['价格']) {
        const [min, max] = parsedFilters['价格']
          .replace(/万/g, "")
          .replace("<", "0-")
          .split("-");
        query.price = { $gte: parseFloat(min) || 0 };
        if (max) query.price.$lte = parseFloat(max);
      }
      if (parsedFilters['面积']) {
        const [min, max] = parsedFilters['面积']
          .replace(/㎡/g, "")
          .replace("<", "0-")
          .split("-");
        query.area = { $gte: +min || 0, $lte: +max || Infinity };
      }
      if (parsedFilters['房型']) {
        const match = parsedFilters['房型'].match(/\d+/);
        if (match) query.roomNum = parseInt(match[0], 10);
      }

      // 添加搜索关键字条件
      if (keyword) {
        query.title = new RegExp(keyword, "i");
      }

      const total = await HouseService.count(query);
      const data = await HouseService.getList(query, skip, +pageSize);

      res.send({ ActionType: "ok", data, total });
    } catch (error) {
      console.error("Error fetching house list:", error);
      res.status(500).send({ ActionType: "error", message: "Error fetching house list" });
    }
  },

      search: async (req, res) => {
        try {
          const { keyword = "" } = req.query;
    
          // 构建模糊搜索条件
          const query = {
            isPublish: 1,
            $or: [
              { title: new RegExp(keyword, "i") },
              { community: new RegExp(keyword, "i") },
              { address: new RegExp(keyword, "i") },
              { decoration: new RegExp(keyword, "i") },
              { orientation: new RegExp(keyword, "i") },
              { subway: new RegExp(keyword, "i") },
              { propertyType: new RegExp(keyword, "i") },
              { buildTime: new RegExp(keyword, "i") },
              { roomNum: Number(keyword) || undefined },
              { hallNum: Number(keyword) || undefined },
              { toiletNum: Number(keyword) || undefined },
              { floor: Number(keyword) || undefined },
              { price: Number(keyword) || undefined },
              { area: Number(keyword) || undefined },
              { perSquarePrice: Number(keyword) || undefined },
            ],
          };
    
          // 调用服务层获取数据
          const data = await HouseService.search(query);
    
          res.send({
            ActionType: "ok",
            data,
          });
        } catch (error) {
          console.error("搜索失败:", error);
          res.status(500).send({ ActionType: "error", message: "搜索失败" });
        }
      },
};

module.exports = HouseController;