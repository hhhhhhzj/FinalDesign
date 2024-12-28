<template>
    <div class="search-container">
      <el-input v-model="searchKeyword" placeholder="请输入关键字搜索" clearable class="search-input">
        <template #append>
          <el-button @click="handleSearch">搜索</el-button>
        </template>
      </el-input>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  
  const searchKeyword = ref(""); // 搜索关键字
  const router = useRouter();
  
  // 搜索处理函数
  const handleSearch = () => {
    if (searchKeyword.value.trim()) {
      router.push({
        path: "/searchresult",
        query: { keyword: searchKeyword.value.trim() },
      });
    }
  };
  </script>
  
  <style scoped>
  .search-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .search-input {
    width: 600px;
    height: 50px;
    font-size: 1.2em;
  }
  
  .el-button {
    display: flex;
    justify-content: center;
  }
  </style>