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
      return UserModel.find({}, [
        "username",
        "role",
        "avatar",
        "phone",
        "introduction",
        "gender",
      ]);
    } catch (error) {
      console.log("userEditServices getList error", error);
    }
  },

  delList: async ({ _id }) => {
    try {
      return UserModel.deleteOne({ _id });
    } catch (error) {
      console.log("userEditServices delList error", error);
    }
  },

  collect: async (userId, houseId) => {
    try {
      // 使用 `$addToSet` 避免重复添加
      await UserModel.updateOne(
        { _id: userId },
        { $addToSet: { collects: houseId } }
      );
      return { message: "收藏成功" };
    } catch (error) {
      console.error("UserEditServices collect error:", error);
      throw new Error("收藏失败");
    }
  },
};
module.exports = UserEditService;
