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
            collects: result[0].collects,
          },
        });
      }
    } catch (error) {
      console.log("userController login error:", error);
    }
  },


  register: async (req, res) => {
    try {
      const { username, phone, introduction, gender, role, password } =
        req.body;
      const avatar = req.file ? `/avataruploads/${req.file.filename}` : "";
      const result = await UserServices.register({
        username,
        phone,
        introduction,
        gender: Number(gender),
        avatar,
        role: Number(role),
        password,
      });

      if (result) {
        res.send({
          ActionType: "ok",
          code: 1, // 1 表示注册成功，2 表示用户名重复
          message: "注册失败，用户名已存在",
        });
      } else {
        res.send({
          ActionType: "error",
          code: 2, // 2: 用户名已存在
          message: "用户名已存在",
        });
      }
    } catch (error) {
      console.log("userController register error:", error);
    }
  },
};
module.exports = UserController;
