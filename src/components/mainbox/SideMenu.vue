<template>
    <el-aside width="auto">
        <el-menu 
            :collapse="$store.state.isCollapsed"
            :collapse-transition="false"
            :router="true"
            :default-active="route.currentRoute.value.path"
            >
            
            <el-menu-item index="/index">
                <el-icon><HomeFilled /></el-icon>
                <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/center">
                <el-icon><Avatar /></el-icon>
                <span>个人中心</span>
            </el-menu-item>
            <el-sub-menu index="/user-manage">
                <template #title>
                    <el-icon>
                        <user-filled />
                    </el-icon>
                    <span>用户管理</span>
                </template>
                    <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>
            </el-sub-menu>
            
            <el-sub-menu index="/product-manage">
                <template #title>
                    <el-icon>
                        <reading />
                    </el-icon>
                    <span>房源管理</span>
                </template>
                    <el-menu-item index="/house-manage/addhouse">添加房源</el-menu-item>
                    <el-menu-item index="/house-manage/houselist">房源列表</el-menu-item>
                    
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>
<script setup>
import {HomeFilled,Avatar,UserFilled,MessageBox,Reading,Pointer} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const route = useRouter()
</script>
<style lang="scss" scoped>
.el-aside {
    height: 100vh;
    .el-menu {
        height: 100vh;
    }
}
</style>