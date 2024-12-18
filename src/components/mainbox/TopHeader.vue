<template>
    <el-header>
        <button @click="handleCollapsed">click</button>
        header
    </el-header>
</template>
<script setup>
import {useStore} from 'vuex' 
const store = useStore()
const handleCollapsed = () => {
    store.commit('changeCollapsed')
}
</script>