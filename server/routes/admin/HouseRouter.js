const express = require('express');
const multer = require('multer');
const HouseController = require('../../controllers/admin/HouseController');

const upload = multer({ dest: 'public/houseuploads/' });
const HouseRouter = express.Router();

HouseRouter.post('/adminapi/house/add', upload.array('houseImg', 5), HouseController.add);
HouseRouter.get('/adminapi/house/list', HouseController.getList);
HouseRouter.post('/adminapi/house/update/:id', upload.array('newImages', 5), HouseController.update);
HouseRouter.put('/adminapi/house/publish', HouseController.publish);
HouseRouter.delete('/adminapi/house/list/:id', HouseController.delList);
HouseRouter.get('/adminapi/house/list/:id', HouseController.getList);

module.exports = HouseRouter;