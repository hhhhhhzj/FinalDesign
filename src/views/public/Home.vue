<template>
  <Nav />
  <div class="home">
    <el-container>
      <div class="search-container">
        <el-input
          v-model="searchKeyword"
          placeholder="请输入关键字搜索"
          
          class="search-input"
        >
          <template #append>
            <el-button @click="handleSearch">搜索</el-button>
          </template>
          <template #suffix>
            <el-button v-if="searchKeyword" @click="clearSearch">清空</el-button>
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
              <HouseCard :house="house"  />
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
import HouseCard from "@/components/web/HouseCard.vue";
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
  }
}

  .el-container {
    width: 75%;
  }

  .filter-container {
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 10px;

    .filter-title {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .house-list {
    margin-top: 10px;
    min-height:500px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
}
</style>