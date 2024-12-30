<template>
  <div class="search-container">
    <el-input
      v-model="searchKeyword"
      placeholder="请输入关键字搜索"
      class="search-input"
    >
      <template #append>
        <el-button @click="onSearch">搜索</el-button>
      </template>
      <template #suffix>
        <el-button v-if="searchKeyword" @click="onClear">清空</el-button>
      </template>
    </el-input>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";

// 定义接收的属性
defineProps({
  modelValue: String,
});

// 定义事件
const emit = defineEmits(["update:modelValue", "search", "clear"]);

const searchKeyword = ref("");

// 同步 `v-model` 的值
searchKeyword.value = modelValue;

const onSearch = () => {
  emit("search", searchKeyword.value); // 触发搜索事件
};

const onClear = () => {
  searchKeyword.value = "";
  emit("clear"); // 触发清空事件
};
</script>

<style scoped>
.search-container {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-input {
  width: 600px;
}
</style>