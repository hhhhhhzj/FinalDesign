const UserModel = require("../../models/UserModel")
const UserServices = {
    login:async (username, password) => {
        //有问题
        return UserModel.find(
            username,
            password
        )
    }
}
module.exports = UserServices