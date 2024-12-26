const HouseService = require('../../services/admin/HouseService');

const HouseController = {
    add: async (req, res) => {
        try {
            const houseImgPaths = req.files.map((file) => `/houseuploads/${file.filename}`);
            const houseData = { ...req.body, houseImg: houseImgPaths };
            const result = await HouseService.add(houseData);

            res.send({
                ActionType: 'ok',
                data: result,
            });
        } catch (error) {
            console.error('房源添加失败:', error);
            res.status(500).send({ ActionType: 'error', message: '房源添加失败' });
        }
    },

    getList: async (req, res) => {
        try {
            
            const result = await HouseService.getList()
            res.send({
                ActionType: 'ok',
                data: result
            })
        } catch (error) {
            console.log('获取房源列表失败:', error);
            res.status(500).send({ ActionType: 'error', message: '获取房源列表失败' });
        }
    },

    publish: async (req, res) => {
        try {
            await HouseService.publish({
                ...req.body,
            })
            res.send({
                ActionType: 'ok'
            })
        } catch (error) {
            console.log('发布房源失败:', error);
            
        }
    }
};

module.exports = HouseController;