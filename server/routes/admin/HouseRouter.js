const express = require('express');
const multer = require('multer');
const HouseController = require('../../controllers/admin/HouseController');

const upload = multer({ dest: 'public/houseuploads/' });
const HouseRouter = express.Router();

HouseRouter.post('/adminapi/house/add', upload.array('houseImg', 5), HouseController.add);
HouseRouter.get('/adminapi/house/list', HouseController.getList)

module.exports = HouseRouter;