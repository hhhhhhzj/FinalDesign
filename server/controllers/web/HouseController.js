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

  getDetail: async (req, res) => {
    try {
        const result = await HouseService.getDetail({ _id: req.params.id });
        res.send({
            ActionType: 'ok',
            data: result,
        });
    } catch (error) {
        console.error('获取房源列表失败:', error);
        res.status(500).send({ ActionType: 'error', message: '获取房源列表失败' });
    }
},
getSimilarHouses: async (req, res) => {
  try {
    const { address, excludeId, limit = 5 } = req.query;
    if (!address) {
      return res.status(400).send({ ActionType: 'error', message: '地址不能为空' });
    }

    // 查询条件：同地址且排除当前房源
    const query = { address, _id: { $ne: excludeId }, isPublish: 1 };

    // 调用服务层方法获取相关房源
    const data = await HouseService.getSimilarHouses(query, +limit);

    res.send({ ActionType: 'ok', data });
  } catch (error) {
    console.error('获取相关房源失败:', error);
    res.status(500).send({ ActionType: 'error', message: '获取相关房源失败' });
  }
},

getCollects: async (req, res) => {
  try {
    const { collects } = req.body; // 从请求 body 中获取收藏的房源 ID 列表

    if (!Array.isArray(collects) || collects.length === 0) {
      return res.status(400).send({
        ActionType: 'error',
        message: '无效的收藏房源列表',
      });
    }

    // 调用 service 层查询符合条件的房源
    const houses = await HouseService.getCollects(collects);

    if (houses.length === 0) {
      return res.status(404).send({
        ActionType: 'error',
        message: '没有找到符合条件的房源',
      });
    }

    // 返回符合条件的房源数据
    res.send({
      ActionType: 'ok',
      data: houses, // 返回找到的房源数据
    });
  } catch (error) {
    console.error('获取收藏房源失败:', error);
    res.status(500).send({
      ActionType: 'error',
      message: '服务器错误，无法获取房源数据',
    });
  }
},
};

module.exports = HouseController;