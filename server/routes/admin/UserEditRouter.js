var express = require('express');
const UserEditController = require('../../controllers/admin/UserEditController');
var UserEditRouter = express.Router();
//图片上传
const multer = require('multer');
const upload = multer({dest: 'public/avataruploads/'});


/* GET home page. */
UserEditRouter.post('/adminapi/userEdit/upload',upload.single('file'),UserEditController.upload)
UserEditRouter.get('/adminapi/userEdit/getList',UserEditController.getList)
UserEditRouter.delete('/adminapi/userEdit/List/:id',UserEditController.delList)
UserEditRouter.post("/adminapi/userEdit/collect", UserEditController.collect);

module.exports = UserEditRouter;