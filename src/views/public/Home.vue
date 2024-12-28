<template>
  <Nav />
  <div class="home">
    <el-container>
      <el-header>header</el-header>
      <el-main>
        <div class="house-list">
          <el-row class="card-rowContainer" :gutter="20">
            <!-- 单个卡片 -->
            <el-col :span="24" v-for="(house, index) in tableData" :key="index">
              <el-card class="house-card" shadow="hover">
                <div class="card-content">
                  <!-- 左侧图片 -->
                  <div class="card-left">
                    <img :src="'http://localhost:3000' + (house.houseImg[1] || '/default.jpg')" alt="房源图片"
                      class="house-image" />
                  </div>
                  <!-- 中间信息 -->
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
                  <!-- 右侧价格 -->
                  <div class="card-right">
                    <span class="total-price">{{ house.price || "未知价格" }}万</span>
                    <span class="price-per-square">均价 {{ house.perSquarePrice || "未知" }} 元/㎡</span>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <el-pagination layout="prev, pager, next" :total="pagination.total" :page-size="pagination.pageSize"
          :current-page="pagination.currentPage" @current-change="handlePageChange" />
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

// 获取表格数据
const getTableData = async () => {
  try {
    const { currentPage, pageSize } = pagination;
    const res = await axios.get(`/adminapi/webhouse/list`, {
      params: { page: currentPage, pageSize },
    });

    tableData.value = res.data.data;
    pagination.total = res.data.total; // 更新总条数
  } catch (error) {
    console.error("获取表格数据失败:", error);
  }
};

// 处理页码变化
const handlePageChange = (page) => {
  pagination.currentPage = page;
  getTableData();
};

// 格式化年份
const formatYear = (date) => {
  if (!date) return "未知年份";
  const year = new Date(date).getFullYear(); // 提取年份
  return year || "未知年份";
};
// 页面加载时获取数据
onMounted(() => {
  getTableData();
});
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;

  .el-container {
    width: 75%;
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