<template>
    <el-header>
        <div class="left">
            <el-icon>
                <Menu @click="handleCollapsed" />
            </el-icon>
            <span style="margin-left:10px;">寄居蟹二手房管理系统</span>
        </div>
        <div class="right">
            <span>欢迎 {{store.state.userInfo.username}} 回来</span> 
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-icon :size="30" color="white">
                        <User />
                    </el-icon>
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="handleCenter">首页</el-dropdown-item>
                        <el-dropdown-item @click="handleExit">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>
<script setup>
import { useStore } from 'vuex'
import { Menu, User, ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
const store = useStore()
const router = useRouter()
const handleCollapsed = () => {
    store.commit('changeCollapsed')
}
const handleCenter = () => {
    router.push('/home')
}
const handleExit = () => {
    localStorage.removeItem('token')
    store.commit("clearUserInfo")
    router.push('/login')
}
</script>
<style lang="scss" scoped>
.el-header {
    background-color: #2d3a4b;
    color: white;
    width: 100%;
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.left,
.right {
    display: flex;
}
.left {
    i {
        margin: auto;
        cursor: pointer;
    }
}
.right {
    .el-dropdown {
        margin: auto;
    }
}
</style>