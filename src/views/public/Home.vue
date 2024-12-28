<template>
  <Nav />
  <div class="home">
    <el-container>
      <div class="search-container">
        <el-input
          v-model="searchKeyword"
          placeholder="请输入关键字搜索"
          clearable
          class="search-input"
        >
          <template #append>
            <el-button @click="handleSearch">搜索</el-button>
          </template>
          <template #suffix>
            <el-button v-if="searchKeyword" @click="clearSearch" icon="el-icon-circle-close"></el-button>
          </template>
        </el-input>
      </div>
      <el-main>
        <div class="filter-container">
          <div class="filter-container">
            <el-row v-for="(options, key) in filterOptions" :key="key">
              <el-col :span="2" class="filter-title">{{ key }}</el-col>
              <el-col :span="22">
                <el-segmented
                  v-model="filters[key]"
                  :options="options"
                  size="small"
                  @change="(value) => applyFilter(key, value)"
                />
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="house-list">
          <el-row class="card-rowContainer" :gutter="20">
            <el-col :span="24" v-for="(house, index) in tableData" :key="index">
              <el-card class="house-card" shadow="hover">
                <div class="card-content">
                  <div class="card-left">
                    <img
                      :src="'http://localhost:3000' + (house.houseImg[1] || '/default.jpg')"
                      alt="房源图片"
                      class="house-image"
                    />
                  </div>
                  <div class="card-middle">
                    <div class="card-header">
                      <h3 class="house-title">{{ house.title || "暂无标题" }}</h3>
                    </div>
                    <div class="house-details">
                      <p class="info-row">
                        {{ house.roomNum || 0 }}室{{ house.hallNum || 0 }}厅{{ house.toiletNum || 0 }}卫 |
                        {{ house.area || "未知面积" }}㎡ | {{ house.floor || "未知楼层" }}楼 |
                        {{ house.orientation || "未知朝向" }} | 建造时间: {{ formatYear(house.buildTime) }}
                      </p>
                      <p class="community-row">
                        小区: {{ house.community || "未知小区" }} | 地址: {{ house.address || "未知地址" }}
                      </p>
                    </div>
                  </div>
                  <div class="card-right">
                    <span class="total-price">{{ house.price || "未知价格" }}万</span>
                    <span class="price-per-square">均价 {{ house.perSquarePrice || "未知" }} 元/㎡</span>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <el-pagination
          layout="prev, pager, next"
          :total="pagination.total"
          :page-size="pagination.pageSize"
          :current-page="pagination.currentPage"
          @current-change="handlePageChange"
        />
      </el-main>
      <el-footer>footer</el-footer>
    </el-container>
  </div>
</template>

<script setup>
import Nav from "@/components/web/Nav.vue";
import { onMounted, ref, reactive } from "vue";
import axios from "axios";

const tableData = ref([]);
const pagination = reactive({
  total: 0,
  pageSize: 10,
  currentPage: 1,
});

const searchKeyword = ref("");

const filters = reactive({
  area: null,
  subway: null,
  price: null,
  roomNum: null,
  orientation: null,
  address: null,
  decoration: null,
});

const filterOptions = {
  面积: ["不限", "<60㎡", "60-70㎡", "70-80㎡", "80㎡以上"],
  地铁: ["不限", "无", "1号线", "2号线", "3号线", "4号线", "5号线", "6号线", "7号线", "8号线", "9号线", "10号线", "17号线", "18号线", "19号线", "30号线"],
  区域: ["不限", "武侯", "金牛", "成华", "龙泉驿", "新都", "双流", "郫都", "大邑", "新津", "邛崃", "崇州", "简阳", "高新"],
  价格: ["不限", "<50万", "50-70万", "70-100万", "100万以上"],
  房型: ["不限", "1室", "2室", "3室", "4室", "5室以上"],
  朝向: ["不限", "南", "北", "东", "西"],
  装修: ["不限", "毛坯", "普通装修", "精装修", "豪华装修"],
};

const getTableData = async () => {
  try {
    const res = await axios.get(`/adminapi/webhouse/list`, {
      params: {
        page: pagination.currentPage,
        pageSize: pagination.pageSize,
        filters: JSON.stringify(filters),
        keyword: searchKeyword.value.trim(),
      },
    });

    if (res.data.ActionType === "ok") {
      tableData.value = res.data.data;
      pagination.total = res.data.total;
    }
  } catch (error) {
    console.error("获取表格数据失败:", error);
  }
};

const handleSearch = async () => {
  pagination.currentPage = 1;
  await getTableData();
};

const clearSearch = async () => {
  searchKeyword.value = "";
  pagination.currentPage = 1;
  await getTableData();
};

const applyFilter = async (key, value) => {
  filters[key] = value === "不限" ? null : value;
  pagination.currentPage = 1;
  await getTableData();
};

const handlePageChange = async (page) => {
  pagination.currentPage = page;
  await getTableData();
};
const formatYear = (date) => {
  if (!date) return "未知年份";
  const year = new Date(date).getFullYear();
  return year || "未知年份";
};

onMounted(() => {
  getTableData();
});
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;

  .search-container {
    margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  .el-button {
    display: flex;
    justify-content: center;
  }
  .search-input {
    width: 50%;
    height: 50px;
    font-size: 1.2em;
    width: 600px;
    border: 1px solid #ccc;
  }
}

  .el-container {
    width: 75%;
  }

  .filter-container {
    border: 1px solid red;

    .filter-title {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .house-list {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 15px;

    .house-card {
      display: flex;
      flex-direction: row;
      padding: 10px;
      border: 1px solid #f0f0f0;
      border-radius: 5px;

      .card-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 15px;

        .card-left {
          flex: 1;

          .house-image {
            width: 180px;
            height: 120px;
            object-fit: cover;
            border-radius: 5px;
          }
        }

        .card-middle {
          flex: 9;
          display: flex;
          flex-direction: column;
          margin-left: 20px;
          gap: 10px;

          .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .house-title {
              font-size: 30px;
              font-weight: bold;
              margin: 0;
            }
          }

          .house-details {

            .info-row,
            .community-row {
              font-size: 14px;
              color: #666;
              line-height: 1.4;
            }
          }
        }

        .card-right {
          flex: 3;
          display: flex;
          flex-direction: column;
          margin-left: 100px;
          justify-content: center;
          gap: 5px;

          .total-price {
            font-size: 36px;
            font-weight: bold;
            color: #ff4d4f;
          }

          .price-per-square {
            font-size: 14px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>