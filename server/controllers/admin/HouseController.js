const HouseServices = require('../../services/admin/HouseService');

const HouseController = {
    add: async (req, res) => {
        try {
            const houseImgPaths = req.files.map((file) => `/houseuploads/${file.filename}`);
            const houseData = { ...req.body, houseImg: houseImgPaths };
            const result = await HouseServices.add(houseData);

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
            
            const result = await HouseServices.getList()
            res.send({
                ActionType: 'ok',
                data: result
            })
        } catch (error) {
            console.log('获取房源列表失败:', error);
            res.status(500).send({ ActionType: 'error', message: '获取房源列表失败' });
        }
    }
};

module.exports = HouseController;