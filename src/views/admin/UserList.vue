<template>
    <div>
        <el-card>
            <el-page-header content="用户列表" icon="" title="用户管理" />
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="username" label="用户名" width="180" />
                <el-table-column label="头像" width="180">
                    <template #default="scope">
                        <div v-if="scope.row.avatar">
                            <el-avatar :size="50" :src="'http://localhost:3000' + scope.row.avatar"></el-avatar>
                        </div>
                        <div v-else>
                            <el-avatar :size="50"
                                src='https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="phone" label="电话号码" width="180" />
                
                <el-table-column label="角色">
                    <template #default="scope">
                        <el-tag v-if="scope.row.role === 1" type="danger">管理员</el-tag>
                        <el-tag v-else type="success">用户</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="Operations">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.row)">
                            编辑
                        </el-button>
                        <el-popconfirm title="你确定要删除吗?"
                        confirmButtonText="确定" cancelButtonText="取消"
                        @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button size="small" type="danger">
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>


</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
const tableData = ref([])
onMounted(() => {
    getTableData()
})
const getTableData = async () => {
    const res = await axios.get('/adminapi/userEdit/getList')
    tableData.value = res.data.data
}

const handleDelete = async(data) => {
    await axios.delete(`/adminapi/userEdit/list/${data._id}`)
    getTableData()
}
</script>

<style lang="scss" scoped>
.el-table {
    margin-top: 50px;
}
</style>