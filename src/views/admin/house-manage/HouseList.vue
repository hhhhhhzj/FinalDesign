<template>
    <el-table :data="filterTableData" style="width: 100%" border row-key="_id"
        :default-sort="{ prop: 'createdAt', order: 'descending' }">
        <!-- 时间列 -->
        <el-table-column label="时间" width="150" prop="createdAt" sortable :sort-method="sortByDate">
            <template #default="scope">
                {{ moment(scope.row.createdAt).utcOffset(8).format('YYYY-MM-DD') }}
            </template>
        </el-table-column>

        <!-- 标题列 -->
        <el-table-column label="标题" prop="title" />

        <!-- 价格列 -->
        <el-table-column label="价格" prop="price" column-key="price" :filters="[
            { text: '0-50万', value: { min: 0, max: 50 } },
            { text: '50-100万', value: { min: 50, max: 100 } },
            { text: '100-200万', value: { min: 100, max: 200 } },
            { text: '200-500万', value: { min: 200, max: 500 } },
            { text: '大于500万', value: { min: 500, max: Infinity } }
        ]" :filter-method="filterByPrice" filter-placement="bottom-end">
            <template #default="scope">
                {{ scope.row.price }} 万
            </template>
        </el-table-column>

        <!-- 地区列 -->
        <el-table-column label="地区" prop="address" column-key="address" :filters="[
            { text: '武侯区', value: '武侯' },
            { text: '金牛区', value: '金牛' },
            { text: '成华区', value: '成华' },
            { text: '龙泉驿区', value: '龙泉驿' },
            { text: '新都区', value: '新都' },
            { text: '双流区', value: '双流' },
            { text: '郫都区', value: '郫都' },
            { text: '大邑县', value: '大邑' },
            { text: '新津县', value: '新津' },
            { text: '邛崃市', value: '邛崃' },
            { text: '崇州市', value: '崇州' },
            { text: '简阳市', value: '简阳' },
            { text: '高新区', value: '高新' }
        ]" :filter-method="filterByAddress" filter-placement="bottom-end" />

        <!-- 朝向列 -->
        <el-table-column label="朝向" prop="orientation" column-key="orientation" :filters="[
            { text: '东', value: '东' },
            { text: '南', value: '南' },
            { text: '西', value: '西' },
            { text: '北', value: '北' },
            { text: '东南', value: '东南' },
            { text: '西南', value: '西南' },
            { text: '东北', value: '东北' },
            { text: '西北', value: '西北' }
        ]" :filter-method="filterByOrientation" filter-placement="bottom-end" />

        <!-- 客厅列 -->
        <el-table-column label="客厅" prop="hallNum" column-key="hallNum" :filters="[
            { text: '1', value: 1 },
            { text: '2', value: 2 },
            { text: '3', value: 3 },
            { text: '4', value: 4 },
            { text: '其他（大于 4）', value: 'other' }
        ]" :filter-method="filterByNumber('hallNum')" filter-placement="bottom-end" />

        <!-- 卧室列 -->
        <el-table-column label="卧室" prop="roomNum" column-key="roomNum" :filters="[
            { text: '1', value: 1 },
            { text: '2', value: 2 },
            { text: '3', value: 3 },
            { text: '4', value: 4 },
            { text: '其他（大于 4）', value: 'other' }
        ]" :filter-method="filterByNumber('roomNum')" filter-placement="bottom-end" />

        <!-- 卫生间列 -->
        <el-table-column label="卫生间" prop="toiletNum" column-key="toiletNum" :filters="[
            { text: '1', value: 1 },
            { text: '2', value: 2 },
            { text: '3', value: 3 },
            { text: '4', value: 4 },
            { text: '其他（大于 4）', value: 'other' }
        ]" :filter-method="filterByNumber('toiletNum')" filter-placement="bottom-end" />

        <!-- 分类列 -->
        <el-table-column label="分类" prop="propertyType" column-key="propertyType" :filters="[
            { text: '公寓', value: '公寓' },
            { text: '别墅', value: '别墅' },
            { text: '普通住宅', value: '普通住宅' },
            { text: '平房', value: '平房' },
            { text: '其他', value: '其他' }
        ]" :filter-method="filterByPropertyType" filter-placement="bottom-end" />

        <el-table-column label="是否发布" prop="isPublish" column-key="isPublish" width="180" :filters="[
            { text: '已发布', value: 1 },
            { text: '未发布', value: 0 }
        ]" :filter-method="filterByPublishStatus" filter-placement="bottom-end">
            <template #default="scope">
                <el-switch v-model="scope.row.isPublish" :active-value="1" :inactive-value="0"
                    @change="handleSwitchChange(scope.row)" />
            </template>
        </el-table-column>

        <!-- 操作列 -->
        <el-table-column align="right" width="150">
            <template #header>
                <el-input v-model="search" size="small" placeholder="Type to search" />
            </template>
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.row)">
                    修改
                </el-button>
                <el-popconfirm 
                        title="你确定要删除吗?" 
                        confirmButtonText="确定" 
                        cancelButtonText="取消"
                        @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button type="danger">
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import moment from 'moment'
import {useRouter} from 'vue-router'

// 表格数据
const tableData = ref([])
const router = useRouter()
// 搜索关键字
const search = ref('')

// 自定义排序方法
const sortByDate = (a, b) => {
    const dateA = new Date(a.createdAt).getTime()
    const dateB = new Date(b.createdAt).getTime()
    return dateA - dateB // 升序排序
}

// 自定义过滤方法
const filterByAddress = (value, row) => row.address === value
const filterByOrientation = (value, row) => row.orientation === value
const filterByPropertyType = (value, row) => row.propertyType === value
const filterByPublishStatus = (value, row) => {
    return row.isPublish === value;
};

const filterByNumber = (key) => {
    return (value, row) => {
        if (value === 'other') {
            return row[key] > 4
        }
        return row[key] === value
    }
}

// 价格过滤
const filterByPrice = (value, row) => {
    const price = row.price
    return price >= value.min && price < value.max
}

// 修改搜索功能：搜索表单显示的所有字段
const filterTableData = computed(() => {
    return tableData.value.filter((data) => {
        // 将表单中显示的字段拼接成一个字符串，然后匹配搜索关键词
        const searchableString = `
            ${data.title || ''}
            ${data.price || ''}
            ${data.area || ''}
            ${data.decoration || ''}
            ${data.address || ''}
            ${data.community || ''}
            ${data.orientation || ''}
            ${data.hallNum || ''}
            ${data.roomNum || ''}
            ${data.toiletNum || ''}
            ${data.propertyType || ''}
            ${data.subway || ''}
        `.toLowerCase()

        return !search.value || searchableString.includes(search.value.toLowerCase())
    })
})

// 编辑操作
const handleEdit = (item) => {
    console.log(item);
    router.push(`/house-manage/edithouse/${item._id}`)
}

//删除回调
const handleDelete = async (item) => {
    // console.log(item);
    await axios.delete(`/adminapi/house/list/${item._id}`)
    await getTableData()
}

// 获取表格数据
const getTableData = async () => {
    try {
        const res = await axios.get(`/adminapi/house/list`)
        tableData.value = res.data.data
    } catch (error) {
        console.error('获取表格数据失败:', error)
    }
}

//开关回调
const handleSwitchChange = async (item) => {
    // console.log(item);
    await axios.put(`/adminapi/house/publish`, {
        _id: item._id,
        isPublish: item.isPublish
    })
    await getTableData()
    console.log(tableData.value);

}

// 页面加载时获取数据
onMounted(() => {
    getTableData()
})
</script>