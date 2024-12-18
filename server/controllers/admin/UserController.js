const UserServices = require("../../services/admin/UserService")
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
            res.send({
                ActionType:'ok',
            })
        }
    }
}
module.exports = UserController
