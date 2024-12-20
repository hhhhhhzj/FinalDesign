const UserModel = require("../../models/UserModel");
const UserEditService = {

  upload: async ({ _id, username, phone, introduction, gender, avatar }) => {
    try {
      if (avatar) {
        return UserModel.updateOne(
          {
            _id,
          },
          {
            username,
            phone,
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
            phone,
            introduction,
            gender,
          }
        );
      }
    } catch (error) {
      console.log("userEditServices upload error", error);
    }
  },

  getList: async () => {
    try {
        
        return UserModel.find({},['username','role','avatar','phone','introduction','gender'])
    } catch (error) {
        console.log("userEditServices getList error", error);
        
    }
}

};
module.exports = UserEditService;
