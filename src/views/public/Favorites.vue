<template>
  <Nav />
  <div class="container">
      <div class="house-list">
        <h1>收藏夹</h1>
        <el-divider />
        <el-row class="card-rowContainer" :gutter="20">
        <el-col :span="24" v-for="(house, index) in tableData" :key="index">
          <HouseCard :house="house" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import Nav from "@/components/web/Nav.vue";  // 确保导入 Nav 组件
import HouseCard from "@/components/web/HouseCard.vue";  // 确保导入 HouseCard 组件

// 用来存储从后端获取的房源数据
const tableData = ref([]);

onMounted(async () => {
  const store = useStore();
  const collects = store.state.userInfo.collects;

  try {
    // 确保发送的数据格式为 { collects: [...] }
    const response = await axios.post('/adminapi/webhouse/collects', { collects });
    
    if (response.data.ActionType === 'ok') {
      tableData.value = response.data.data;
    }
  } catch (error) {
    console.error('favorites error', error);
  }
});
</script>

<style lang="scss" scoped>
.container {
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    width: 100%;
    .house-list {
        width: 70%;
    }
}
</style>