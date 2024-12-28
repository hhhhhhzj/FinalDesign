const express = require('express');
const multer = require('multer');
const HouseController = require('../../controllers/web/HouseController');

const upload = multer({ dest: 'public/houseuploads/' });
const HouseRouter = express.Router();


HouseRouter.get('/adminapi/webhouse/list', HouseController.getList);


module.exports = HouseRouter;