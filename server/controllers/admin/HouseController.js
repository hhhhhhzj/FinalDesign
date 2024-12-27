const HouseService = require('../../services/admin/HouseService');
const fs = require('fs');
const path = require('path');

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
            const result = await HouseService.getList({ _id: req.params.id });
            res.send({
                ActionType: 'ok',
                data: result,
            });
        } catch (error) {
            console.error('获取房源列表失败:', error);
            res.status(500).send({ ActionType: 'error', message: '获取房源列表失败' });
        }
    },

    publish: async (req, res) => {
        try {
            await HouseService.publish(req.body);
            res.send({ ActionType: 'ok' });
        } catch (error) {
            console.error('发布房源失败:', error);
            res.status(500).send({ ActionType: 'error', message: '发布房源失败' });
        }
    },

    delList: async (req, res) => {
        try {
            const house = await HouseService.getById(req.params.id);

            if (!house) {
                return res.status(404).send({
                    ActionType: 'error',
                    message: '房源不存在',
                });
            }

            // 删除对应图片文件
            house.houseImg.forEach((imgPath) => {
                const fullPath = path.join(__dirname, '../../public', imgPath);
                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath);
                }
            });

            await HouseService.delList({ _id: req.params.id });

            res.send({ ActionType: 'ok' });
        } catch (error) {
            console.error('删除房源失败:', error);
            res.status(500).send({ ActionType: 'error', message: '删除房源失败' });
        }
    },

    update: async (req, res) => {
        try {
            const { deletedImages, ...houseData } = req.body;

            // 删除旧图片文件
            if (deletedImages) {
                const imagesToDelete = JSON.parse(deletedImages);
                imagesToDelete.forEach((imgPath) => {
                    const fullPath = path.join(__dirname, '../../public', imgPath);
                    if (fs.existsSync(fullPath)) {
                        fs.unlinkSync(fullPath);
                    }
                });
            }

            // 新上传图片路径
            const newImages = req.files.map((file) => `/houseuploads/${file.filename}`);

            // 获取现有房源数据
            const house = await HouseService.getById(req.params.id);
            if (!house) {
                return res.status(404).send({
                    ActionType: 'error',
                    message: '房源未找到',
                });
            }

            // 合并图片数据
            const updatedImages = Array.from(
                new Set([...house.houseImg.filter((img) => !deletedImages?.includes(img)), ...newImages])
            );

            // 更新房源数据
            const updatedHouse = await HouseService.update(req.params.id, {
                ...houseData,
                houseImg: updatedImages,
            });

            res.send({
                ActionType: 'ok',
                data: updatedHouse,
            });
        } catch (error) {
            console.error('更新房源失败:', error);
            res.status(500).send({ ActionType: 'error', message: '更新房源失败' });
        }
    },
};

module.exports = HouseController;