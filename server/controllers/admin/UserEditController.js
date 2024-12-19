const UserEditServices = require("../../services/admin/UserEditservice");
const JWT = require("../../util/JWT");

const UserEditController = {

  upload: async (req, res) => {
    try {
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


};
module.exports = UserEditController;
