<template>
    <el-upload
        class="multi-uploader"
        list-type="picture-card"
        :file-list="fileList"
        :auto-upload="false"
        :on-change="handleFileChange"
        :on-remove="handleFileRemove"
    >
        <el-icon class="uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import { Plus } from '@element-plus/icons-vue';

const props = defineProps({
    modelValue: Array, // 用于绑定传递的图片列表
});

const emits = defineEmits(['update:modelValue']);

// 上传文件列表
const fileList = ref([]);


console.log('multi-upload,',fileList.value);

// 每次文件变化的回调
const handleFileChange = (file, fileListUpdated) => {
    // 更新本地 fileList 数据
    
    fileList.value = fileListUpdated.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file.raw),
        raw: file.raw,
    }));
    // 将文件列表回传给父组件
    emits('update:modelValue', fileList.value);
};

// 删除文件的回调
const handleFileRemove = (file) => {
    // 从 fileList 中移除
    const index = fileList.value.findIndex((item) => item.name === file.name);
    if (index !== -1) {
        fileList.value.splice(index, 1);
    }

    // 将文件列表回传给父组件
    emits('update:modelValue', fileList.value);
};
</script>

<style lang="scss" scoped>
.multi-uploader {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}
.multi-uploader:hover {
    border-color: var(--el-color-primary);
}
.uploader-icon {
    font-size: 28px;
    color: #8c939d;
    text-align: center;
}
</style>