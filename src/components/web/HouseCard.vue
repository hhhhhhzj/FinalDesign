<template>
    <el-card class="house-card" shadow="hover">
      <div class="card-content">
        <!-- 左侧图片 -->
        <div class="card-left">
          <img :src="'http://localhost:3000' + (house.houseImg[1] || '/default.jpg')" alt="房源图片" class="house-image" />
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
  </template>
  
  <script setup>
  import { defineProps } from "vue";
  
  defineProps({
    house: {
      type: Object,
      required: true,
    },
  });
  
  // 格式化年份
  const formatYear = (date) => {
    if (!date) return "未知年份";
    const year = new Date(date).getFullYear();
    return year || "未知年份";
  };
  </script>
  
  <style scoped>
  .house-card {
    display: flex;
    flex-direction: row;
    padding: 10px;
    border: 1px solid #f0f0f0;
    border-radius: 5px;
  }
  
  .card-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
  }
  
  .card-left .house-image {
    width: 180px;
    height: 120px;
    object-fit: cover;
    border-radius: 5px;
  }
  
  .card-middle {
    flex: 9;
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    gap: 10px;
  }
  
  .card-header .house-title {
    font-size: 30px;
    font-weight: bold;
    margin: 0;
  }
  
  .house-details .info-row,
  .house-details .community-row {
    font-size: 14px;
    color: #666;
    line-height: 1.4;
  }
  
  .card-right {
    flex: 3;
    display: flex;
    flex-direction: column;
    margin-left: 100px;
    justify-content: center;
    gap: 5px;
  }
  
  .card-right .total-price {
    font-size: 36px;
    font-weight: bold;
    color: #ff4d4f;
  }
  
  .card-right .price-per-square {
    font-size: 14px;
    color: #999;
  }
  </style>