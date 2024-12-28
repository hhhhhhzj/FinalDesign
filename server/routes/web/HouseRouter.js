const express = require('express');
const multer = require('multer');
const HouseController = require('../../controllers/web/HouseController');

const upload = multer({ dest: 'public/houseuploads/' });
const HouseRouter = express.Router();


HouseRouter.get('/adminapi/webhouse/list', HouseController.getList);
HouseRouter.get("/adminapi/webhouse/search", HouseController.search);

module.exports = HouseRouter;