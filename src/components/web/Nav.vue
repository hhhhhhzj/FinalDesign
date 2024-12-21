<template>
    <el-menu  mode="horizontal" :ellipsis="false" :router="true"
        :default-active="router.currentRoute.value.path">
        <el-menu-item index="/home">
            <img style="width: 40px" src="../../assets/寄居蟹.png" alt="Element logo" />
            <span class="title">寄居蟹二手房</span>
        </el-menu-item>
        <el-menu-item index="/index">后台系统</el-menu-item>
        
        <el-menu-item index="/favorites">收藏夹</el-menu-item>
        <el-menu-item index="/profile">个人中心</el-menu-item>

        <div class="login-state" v-if="!store.state.userInfo.username">
            <el-button type="primary" @click="router.push('/login')">
                登陆
            </el-button>
            <el-button @click="router.push('/register')">
                注册
            </el-button>
        </div>
        <div class="login-state" v-else>
            <el-avatar :size=40 :src="avatarUrl" />
            <span>{{ store.state.userInfo.username }}</span>
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-icon>
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="handleExit">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>

    </el-menu>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'

const router = useRouter()
const store = useStore()
const avatarUrl = computed(
    () => store.state.userInfo.avatar ? 'http://localhost:3000' + store.state.userInfo.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
)

const handleExit = () => {
    localStorage.removeItem('token')
    store.commit("clearUserInfo")
    router.push('/login')
}
</script>

<style lang="scss" scoped>
.el-menu--horizontal>.el-menu-item:nth-child(1) {
    margin-right: auto;
}

.title {
    font-size: 24px;
    margin-left: 10px;
}

.login-state {
    width: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    span{
        margin-left: 10px;
    }
}
</style>