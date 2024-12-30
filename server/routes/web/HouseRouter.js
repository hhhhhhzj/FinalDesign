const express = require('express');
const HouseController = require('../../controllers/web/HouseController');

const HouseRouter = express.Router();

HouseRouter.get('/adminapi/webhouse/list', HouseController.getList);
HouseRouter.get('/adminapi/webhouse/list/:id', HouseController.getDetail);
HouseRouter.get('/adminapi/webhouse/similar', HouseController.getSimilarHouses);

module.exports = HouseRouter;