const UserModel = require("../../models/UserModel");
const UserServices = {
  login: async (username, password) => {
    try {
      return UserModel.find(username, password);
    } catch (error) {
      console.log("userServices login error", error);
    }
  },

  register: async ({
    username,
    phone,
    introduction,
    gender,
    avatar,
    password,
    role,
  }) => {
    try {
      const existingUser = await UserModel.findOne({ username });

      if (existingUser) {
        return false;
      } else {
        return UserModel.create({
          username,
          phone,
          introduction,
          gender,
          avatar,
          password,
          role,
        });
      }
    } catch (error) {
      console.log("userServices register error", error);
    }
  },
};
module.exports = UserServices;
