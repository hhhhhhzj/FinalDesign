const express = require('express');
const HouseController = require('../../controllers/web/HouseController');

const HouseRouter = express.Router();

HouseRouter.get('/adminapi/webhouse/list', HouseController.getList);

module.exports = HouseRouter;