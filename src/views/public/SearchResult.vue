<template>
    <div class="search-results">
      <h2>搜索结果</h2>
      <div v-if="tableData.length">
        <el-row class="card-rowContainer" :gutter="20">
          <el-col :span="24" v-for="(house, index) in tableData" :key="index">
            <el-card class="house-card" shadow="hover">
              <div class="card-content">
                <div class="card-left">
                  <img :src="'http://localhost:3000' + (house.houseImg[1] || '/default.jpg')" alt="房源图片" class="house-image" />
                </div>
                <div class="card-middle">
                  <h3 class="house-title">{{ house.title }}</h3>
                  <p>{{ house.price }} 万 | {{ house.area }}㎡ | {{ house.decoration }} | {{ house.address }}</p>
                </div>
                <div class="card-right">
                  <span class="total-price">{{ house.price }} 万</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <p v-else>没有找到相关房源。</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import axios from "axios";
  
  const tableData = ref([]);
  const route = useRoute();
  
  onMounted(async () => {
    const keyword = route.query.keyword;
    if (keyword) {
      const res = await axios.get("/adminapi/webhouse/search", {
        params: { keyword },
      });
      tableData.value = res.data.data;
    }
  });
  </script>
  
  <style scoped>
  .search-results {
    width: 75%;
    margin: auto;
    padding: 20px;
  }
  .card-content {
    display: flex;
  }
  .card-left img {
    width: 150px;
    height: 100px;
    object-fit: cover;
  }
  .card-middle {
    flex: 1;
    padding-left: 10px;
  }
  .card-right {
    padding-left: 10px;
    font-weight: bold;
  }
  </style>