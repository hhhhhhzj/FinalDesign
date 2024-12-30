const UserEditServices = require("../../services/admin/UserEditservice");
const JWT = require("../../util/JWT");

const UserEditController = {

  upload: async (req, res) => {
    try {
      console.log("login req.body:", req.body);
      const { username, phone, introduction, gender } = req.body;
      const token = req.headers["authorization"].split(" ")[1];
      console.log("token", token);
      const avatar = req.file?`/avataruploads/${req.file.filename}`:''
      var payload = JWT.verify(token);
      //调用service 模块更新 数据

      await UserEditServices.upload({
        _id: payload.id,
        username,
        introduction,
        phone,
        gender: Number(gender),
        avatar,
      });


        if (avatar) {
          res.send({
            ActionType: "ok",
            code: 1, // 1 表示修改成功，2 表示用户名重复
            data: {
              username,
              phone,
              introduction,
              gender: Number(gender),
              avatar,
            },
          });
        } else {
          res.send({
            ActionType: "ok",
            code: 1, // 1 表示修改成功，2 表示用户名重复
            data: {
              username,
              phone,
              introduction,
              gender: Number(gender),
            },
          });
        }

    } catch (error) {
      console.log("userEditController upload error:", error);
    }
  },


  getList: async (req, res) => {
    try {
        
        const result = await UserEditServices.getList()
        res.send({
            ActionType: 'ok',
            data: result
        })
    } catch (error) {
        console.log("userEditController getList error:", error);
        
    }
},

delList: async (req, res) => {
    try {
        
        const result = await UserEditServices.delList({_id:req.params.id})
        res.send({
            ActionType: 'ok',
        })
    } catch (error) {
        console.log("userEditController delList error:", error);
        
    }
},

collect: async (req, res) => {
  try {
    const { houseId } = req.body;
    const token = req.headers["authorization"].split(" ")[1];
    const payload = JWT.verify(token);

    // 调用 Service 层的方法
    const result = await UserEditServices.collect(payload.id, houseId);

    res.send({
      ActionType: "ok",
      message: result.message,
    });
  } catch (error) {
    console.error("收藏失败:", error);
    res.status(500).send({
      ActionType: "error",
      message: "收藏失败",
    });
  }
},

};
module.exports = UserEditController;
