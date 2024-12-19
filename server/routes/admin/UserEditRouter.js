var express = require('express');
const UserEditController = require('../../controllers/admin/UserEditController');
var UserEditRouter = express.Router();
//图片上传
const multer = require('multer');
const upload = multer({dest: 'public/avataruploads/'});


/* GET home page. */
UserEditRouter.post('/adminapi/user/upload',upload.single('file'),UserEditController.upload)

module.exports = UserEditRouter;