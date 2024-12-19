const UserServices = require("../../services/admin/UserService");
const JWT = require("../../util/JWT");

const UserController = {
  login: async (req, res) => {
    try {
      //req.body
      var result = await UserServices.login(req.body);
      if (result.length === 0) {
        res.send({
          code: "-1",
          error: "用户名密码不匹配",
        });
      } else {
        //生成token
        const token = JWT.generate(
          {
            id: result[0].id,
            username: result[0].username,
          },
          "100s"
        );
        res.header("Authorization", token);

        res.send({
          ActionType: "ok",
          data: {
            username: result[0].username,
            gender: result[0].gender ? result[0].gender : 0, //性别，0，1，2
            phone: result[0].phone,
            introduction: result[0].introduction,
            avatar: result[0].avatar,
            role: result[0].role,
          },
        });
      }
    } catch (error) {
      console.log("userController login error:", error);
    }
  },

  upload: async (req, res) => {
    try {
      const { username, phone, introduction, gender } = req.body;
      const token = req.headers["authorization"].split(" ")[1];
      console.log("token", token);
      const avatar = req.file?`/avataruploads/${req.file.filename}`:''
      var payload = JWT.verify(token);
      //调用service 模块更新 数据

      await UserServices.upload({
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
            introduction,
            gender: Number(gender),
          },
        });
      }
    } catch (error) {
      console.log("userController upload error:", error);
    }
  },
};
module.exports = UserController;
