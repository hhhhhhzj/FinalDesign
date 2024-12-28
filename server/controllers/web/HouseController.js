const HouseService = require('../../services/web/HouseService');

const HouseController = {

    getList: async (req, res) => {
        try {
            const { page = 1, pageSize = 10 } = req.query; // 获取分页参数，默认第一页，每页10条
            const skip = (page - 1) * pageSize; // 计算跳过的数据量

            const total = await HouseService.count(); // 总条数
            const result = await HouseService.getList({ skip, limit: +pageSize }); // 获取分页数据

            res.send({
                ActionType: 'ok',
                data: result,
                total, // 返回总条数供前端分页器使用
            });
        } catch (error) {
            console.error('web获取房源列表失败:', error);
            res.status(500).send({ ActionType: 'error', message: '获取房源列表失败' });
        }
    },
};

module.exports = HouseController;