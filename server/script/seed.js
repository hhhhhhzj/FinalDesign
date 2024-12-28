const mongoose = require("mongoose");
const HouseModel = require("../models/HouseModel"); // 确保路径正确
const faker = require("faker/locale/zh_CN");

// 连接数据库
mongoose
  .connect("mongodb://127.0.0.1:27017/secondhouse-system", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// 图片路径
const imagePaths = [
  "/houseuploads/78a8daabb7ff65405765c4374255806b",
  "/houseuploads/4e701d7a5269a6afe26900e519e30498",
  "/houseuploads/32388dcbd5bd2581bc9a4d56d00b1169",
  "/houseuploads/4c8426d16af3d035514d60214e2cbbd7",
  "/houseuploads/81dd05f23b2d688dbe5940ed4e4c316f"
];

// 房源生成逻辑
const generateHouseData = () => {
  const orientations = ["南", "北", "东", "西", "东南", "东北", "西南", "西北"];
  const propertyTypes = ["公寓", "别墅", "普通住宅", "平房", "其他"];
  const decorations = ["毛坯", "普通装修", "精装修", "豪华装修"];
  const subways = [
    "无",
    "1号线",
    "2号线",
    "3号线",
    "4号线",
    "5号线",
    "6号线",
    "7号线",
    "8号线",
    "9号线",
    "10号线",
    "17号线",
    "18号线",
    "19号线",
    "30号线",
  ];
  const addresses = [
    "武侯",
    "金牛",
    "成华",
    "龙泉驿",
    "新都",
    "双流",
    "郫都",
    "大邑",
    "新津",
    "邛崃",
    "崇州",
    "简阳",
    "高新",
  ];

  const area = faker.datatype.number({ min: 60, max: 200 });
  const price = faker.datatype.number({ min: 50, max: 300 });
  const perSquarePrice = Math.round((price * 10000) / area);

  return {
    title: `${faker.datatype.number({
      min: 50,
      max: 80,
    })}个 ${faker.random.arrayElement(
      decorations
    )}套三双卫 ${faker.random.arrayElement(
      subways
    )} ${faker.random.arrayElement(orientations)}通透 随时看房`,
    price,
    area,
    decoration: faker.random.arrayElement(decorations),
    buildTime: faker.date.past(30).toISOString().slice(0, 10), // 生成符合 ISO 8601 格式的日期
    orientation: faker.random.arrayElement(orientations),
    floor: faker.datatype.number({ min: 1, max: 30 }),
    subway: faker.random.arrayElement(subways),
    perSquarePrice,
    roomNum: faker.datatype.number({ min: 1, max: 5 }),
    hallNum: faker.datatype.number({ min: 1, max: 3 }),
    toiletNum: faker.datatype.number({ min: 1, max: 3 }),
    propertyType: faker.random.arrayElement(propertyTypes),
    community: "福悦里", // 固定小区名称
    address: faker.random.arrayElement(addresses),
    sellPoint: `1.房源优势：坐北朝南，位置安静，品质小区。\n2.装修介绍：业主原来自住，精心设计，室内干净温馨。\n3.户型正气：南北的户型、格局周正合理、无浪费面积。\n4.采光充足：楼间距很大、无遮挡、采光非常棒。\n5.地理位置：位于商业繁华地段。闹市中安静的家。`,
    ownerMood: `1.【房屋状况】：该套房双证齐全，可按揭贷款。\n2.【现在情况】：每一套房源，我们公司只服务一位客户\n3.【专业团队】：全程交易公开透明，专业权证团队，保障产权及时过户，律师团队，全程尽调实勘服务\n4.【友情提示】：买房的朋友可私信告知我需求，为您匹配合适房源,。`,
    houseImg: imagePaths,
    createdAt: new Date(),
    isPublish: 1,
  };
};

// 插入数据
const seedData = async () => {
  try {
    const data = Array.from({ length: 3 }, generateHouseData); // 生成 3 条数据
    await HouseModel.insertMany(data); // 插入数据到 MongoDB
    console.log("数据插入成功");
    mongoose.disconnect(); // 断开数据库连接
  } catch (error) {
    console.error("数据插入失败:", error);
    mongoose.disconnect();
  }
};

seedData();
