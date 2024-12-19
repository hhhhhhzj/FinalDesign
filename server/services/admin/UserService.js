const UserModel = require("../../models/UserModel");
const UserServices = {
  login: async (username, password) => {
    try {
      return UserModel.find(username, password);
    } catch (error) {
      console.log("userServices login error", error);
    }
  },

  upload: async ({ _id, username, phone, introduction, gender, avatar }) => {
    try {
      if (avatar) {
        return UserModel.updateOne(
          {
            _id,
          },
          {
            username,
            introduction,
            gender,
            avatar,
          }
        );
      } else {
        return UserModel.updateOne(
          {
            _id,
          },
          {
            username,
            introduction,
            gender,
          }
        );
      }
    } catch (error) {
      console.log("userServices upload error", error);
    }
  },
};
module.exports = UserServices;
