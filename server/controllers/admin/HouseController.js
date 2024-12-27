const HouseService = require('../../services/admin/HouseService');
const fs = require('fs');
const path = require('path'); // 添加这一行

const HouseController = {
    add: async (req, res) => {
        try {
            const houseImgPaths = req.files.map((file) => `/houseuploads/${file.filename}`);
            console.log('houseImgPaths:', houseImgPaths);
            console.log('req', req.files);
            
            
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
            
            const result = await HouseService.getList({ _id: req.params.id })
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
    },

    // 删除房源
    delList: async (req, res) => {
        try {
            // 从数据库中查找记录
            const house = await HouseService.getById(req.params.id);

            if (house) {
                // 遍历 houseImg 字段中的每个路径
                house.houseImg.forEach((imgPath) => {
                    // 提取完整路径，修正路径问题，加入 server 文件夹
                    const fullPath = path.join(__dirname, '../../public', imgPath);
                    console.log(`尝试删除图片路径: ${fullPath}`); // 日志打印路径

                    // 检查文件是否存在并删除
                    if (fs.existsSync(fullPath)) {
                        try {
                            fs.unlinkSync(fullPath); // 同步删除文件
                            console.log(`成功删除图片: ${fullPath}`);
                        } catch (err) {
                            console.error(`删除图片失败: ${fullPath}`, err);
                        }
                    } else {
                        console.warn(`图片文件不存在: ${fullPath}`);
                    }
                });

                // 删除数据库中的房源记录
                await HouseService.delList({ _id: req.params.id });

                res.send({
                    ActionType: 'ok',
                });
            } else {
                res.status(404).send({
                    ActionType: 'error',
                    message: '房源不存在',
                });
            }
        } catch (error) {
            console.error('删除房源失败:', error);
            res.status(500).send({
                ActionType: 'error',
                message: '删除房源失败',
            });
        }
    },

    update: async (req, res) => {
        try {
            const { deletedImages, ...houseData } = req.body;
            console.log('deletedImages:', deletedImages)
            console.log('houseData:', houseData)
            // 删除旧图片文件
            if (deletedImages) {
                const imagesToDelete = JSON.parse(deletedImages);
                imagesToDelete.forEach((imgPath) => {
                    const fullPath = path.join(__dirname, '../../public', imgPath);
                    if (fs.existsSync(fullPath)) {
                        fs.unlinkSync(fullPath); // 删除文件
                        console.log(`Deleted image: ${fullPath}`);
                    }
                });
    
                // 从数据库中删除旧图片记录
                await HouseService.removeImages(req.params.id, imagesToDelete);
            }
    
            // 新上传的图片路径
            const newImages = req.files.map((file) => `/houseuploads/${file.filename}`);
    
            // 合并新上传的图片和现有图片
            const updatedHouse = await HouseService.update(req.params.id, {
                ...houseData,
                newImages, // 只传入新图片，由服务层合并处理
            });
    
            res.send({
                ActionType: 'ok',
                data: updatedHouse,
            });
        } catch (error) {
            console.error('更新房源失败:', error);
            res.status(500).send({
                ActionType: 'error',
                message: '更新房源失败',
            });
        }
    }
};

module.exports = HouseController;