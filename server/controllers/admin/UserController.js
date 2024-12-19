const UserServices = require("../../services/admin/UserService");
const JWT = require("../../util/JWT");

const UserController = {
    login: async (req, res) => {
        //req.body
        var result = await UserServices.login(req.body)
        if (result.length === 0) {
            res.send({
                code: '-1',
                error: '用户名密码不匹配'
            })
        }else {

            //生成token     
            const token = JWT.generate({
                id: result[0].id,
                username: result[0].username,
            },"10s")
            res.header('Authorization', token)

            res.send({
                ActionType:'ok',
                data: {
                    username: result[0].username,
                    gender: result[0].gender?result[0].gender:0,//性别，0，1，2
                    phone: result[0].phone,
                    introduction: result[0].introduction,
                    avatar: result[0].avatar,
                    role: result[0].role,
                }
            })
        }
    }
}
module.exports = UserController
