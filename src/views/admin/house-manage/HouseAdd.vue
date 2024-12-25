<template>
    <div>
        <el-page-header content="添加房源" icon="" title="房源管理" />
        <el-form ref="houseFormRef" style="max-width: 800px" :model="houseForm" :rules="houseFormRules"
            label-width="80px" class="demo-ruleForm" status-icon>
            <el-form-item label="标题" prop="title">
                <el-input v-model="houseForm.title" />
            </el-form-item>
            <el-form-item label="价格" prop="price">
                <el-input v-model="houseForm.price" />
            </el-form-item>
            <el-form-item label="面积" prop="area">
                <el-input v-model="houseForm.area" />
            </el-form-item>
            <el-form-item label="每平方价格" prop="perSquarePrice">
                <el-input v-model="houseForm.perSquarePrice" />
            </el-form-item>
            <el-form-item label="卧室" prop="roomNum">
                <el-input v-model="houseForm.roomNum" />
            </el-form-item>
            <el-form-item label="竣工时间" prop="buildTime">
                <el-date-picker v-model="houseForm.buildTime" type="year" placeholder="Pick a year" />
            </el-form-item>
            <el-form-item label="客厅" prop="hallNum">
                <el-input v-model="houseForm.hallNum" />
            </el-form-item>
            <el-form-item label="厕所" prop="toiletNum">
                <el-input v-model="houseForm.toiletNum" />
            </el-form-item>
            <el-form-item label="小区" prop="community">
                <el-input v-model="houseForm.community" />
            </el-form-item>
            <el-form-item label="朝向" prop="orientation">
                <el-cascader v-model="houseForm.orientation" :options="orientationOptions" :props="props" />
            </el-form-item>
            <el-form-item label="楼层" prop="floor">
                <el-cascader v-model="houseForm.floor" :options="floorOptions" :props="props" />
            </el-form-item>
            <el-form-item label="物业类型" prop="propertyType">
                <el-cascader v-model="houseForm.propertyType" :options="propertyTypeOptions" :props="props" />
            </el-form-item>
            <el-form-item label="装修" prop="decoration">
                <el-cascader v-model="houseForm.decoration" :options="decorationOptions" :props="props" />
            </el-form-item>
            <el-form-item label="地铁" prop="subway">
                <el-cascader v-model="houseForm.subway" :options="subwayOptions" :props="props" />
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-cascader v-model="houseForm.address" :options="addressOptions" :props="props" />
            </el-form-item>
            <el-form-item label="核心卖点" prop="sellPoint">
                <el-input type="textarea" v-model="houseForm.sellPoint" />
            </el-form-item>
            <el-form-item label="业主心态" prop="ownerMood">
                <el-input type="textarea" v-model="houseForm.ownerMood" />
            </el-form-item>

            <!-- <el-form-item label="户型图" prop="floorPlan">
                <Upload :avatar="houseForm.floorPlan" @kerwinchange="handleFoolrPlanUploadChange" />
            </el-form-item> -->

            <el-form-item label="室内图片" prop="houseImg">
                <MultiUpload v-model="houseForm.houseImg" :max-count="5" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    添加房源
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
// import Upload from '@/components/mainbox/Upload.vue'
// import Uploads from '@/components/mainbox/Uploads.vue'
import { Plus } from '@element-plus/icons-vue'
import MultiUpload from '@/components/mainbox/MultiUpload.vue';
import { ElMessage } from 'element-plus';
import axios from 'axios'

// --------------------------------
const houseFormRef = ref()
const houseForm = reactive({
    title: '',
    price: 0,
    area: 0,
    decoration: '',
    buildTime: '',
    orientation: '',
    floor: '',
    subway: '',
    perSquarePrice: 0,
    roomNum: '',
    hallNum: '',
    toiletNum: '',
    propertyType: '',
    community: '',
    address: '',
    sellPoint: '',
    ownerMood: '',
    houseImg: [],
})
const houseFormRules = reactive({
    title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
    price: [{ required: true, message: '请输入价格', trigger: 'blur' }, {
        pattern: /^[0-9]+(\.[0-9]{1,2})?$/, // 匹配整数或最多两位小数的数字
        message: '请输入有效的价格（数字）',
        trigger: 'blur'
    }],
    buildTime: [{ required: true, message: '请选择建筑时间', trigger: 'blur' }],
    decoration: [{ required: true, message: '请选择装修类型', trigger: 'blur' }],
    orientation: [{ required: true, message: '请选择朝向', trigger: 'blur' }],
    propertyType: [{ required: true, message: '请选择物业类型', trigger: 'blur' }],
    subway: [{ required: true, message: '请选择地铁', trigger: 'blur' }],
    floor: [{ required: true, message: '请选择楼层', trigger: 'blur' }],
    area: [{ required: true, message: '请输入面积', trigger: 'blur' }, {
        pattern: /^[0-9]+(\.[0-9]{1,2})?$/, // 匹配整数或最多两位小数的数字
        message: '请输入有效的价格（数字）',
        trigger: 'blur'
    }],
    perSquarePrice: [{ required: true, message: '请输入每平方价格', trigger: 'blur' }, {
        pattern: /^[0-9]+(\.[0-9]{1,2})?$/, // 匹配整数或最多两位小数的数字
        message: '请输入有效的价格（数字）',
        trigger: 'blur'
    }],
    roomNum: [{ required: true, message: '请输入卧室数量', trigger: 'blur' }, {
        pattern: /^[0-9]+(\.[0-9]{1,2})?$/, // 匹配整数或最多两位小数的数字
        message: '请输入有效的价格（数字）',
        trigger: 'blur'
    }],
    hallNum: [{ required: true, message: '请输入客厅数量', trigger: 'blur' }, {
        pattern: /^[0-9]+(\.[0-9]{1,2})?$/, // 匹配整数或最多两位小数的数字
        message: '请输入有效的价格（数字）',
        trigger: 'blur'
    }],
    toiletNum: [{ required: true, message: '请输入厕所数量', trigger: 'blur' }, {
        pattern: /^[0-9]+(\.[0-9]{1,2})?$/, // 匹配整数或最多两位小数的数字
        message: '请输入有效的价格（数字）',
        trigger: 'blur'
    }],
    community: [{ required: true, message: '请输入小区名称', trigger: 'blur' }],
    address: [{ required: true, message: '请选择地址', trigger: 'blur' }],
    sellPoint: [{ required: true, message: '请输入核心卖点', trigger: 'blur' }],
    ownerMood: [{ required: true, message: '请输入业主心态', trigger: 'blur' }],
})

const submitForm = async () => {
    houseFormRef.value.validate(async (valid) => {
        if (valid) {
            const formData = new FormData();
            // 普通字段
            Object.keys(houseForm).forEach((key) => {
                if (key !== 'houseImg') {
                    formData.append(key, houseForm[key]);
                }
            });

            // 上传图片
            houseForm.houseImg.forEach((file) => {
                formData.append('houseImg', file.raw);
            });

            try {
                const res = await axios.post('/adminapi/house/add', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (res.data.ActionType === 'ok') {
                    ElMessage.success('房源添加成功');
                } else {
                    ElMessage.error(res.data.message || '房源添加失败');
                }
            } catch (error) {
                ElMessage.error('提交失败，请稍后再试');
                console.error('提交失败:', error);
            }
        }
    });
};

const props = {
    expandTrigger: 'hover',
}

const addressOptions = [
    {
        value: '武侯',
        label: '武侯区',
    },
    {
        value: '金牛',
        label: '金牛区',
    },
    {
        value: '成华',
        label: '成华区',
    },
    {
        value: '龙泉驿',
        label: '龙泉驿区',
    },
    {
        value: '新都',
        label: '新都区',
    },
    {
        value: '双流',
        label: '双流区',
    },
    {
        value: '郫都',
        label: '郫都区',
    },
    {
        value: '大邑',
        label: '大邑县',
    },
    {
        value: '新津',
        label: '新津县',
    },
    {
        value: '邛崃',
        label: '邛崃市',
    },
    {
        value: '崇州',
        label: '崇州市',
    },
    {
        value: '简阳',
        label: '简阳市',
    },
    {
        value: '高新',
        label: '高新区',
    },
]

const floorOptions = [
    {
        value: '底层',
        label: '底层',
    },
    {
        value: '低层',
        label: '低层',
    },
    {
        value: '中层',
        label: '中层',
    },
    {
        value: '高层',
        label: '高层',
    },
    {
        value: '顶层',
        label: '顶层',
    }
]
const orientationOptions = [
    {
        value: '南',
        label: '南',
    },
    {
        value: '北',
        label: '北',
    },
    {
        value: '东',
        label: '东',
    },
    {
        value: '西',
        label: '西',
    },
    {
        value: '东南',
        label: '东南',
    },
    {
        value: '东北',
        label: '东北',
    },
    {
        value: '西南',
        label: '西南',
    },
    {
        value: '西北',
        label: '西北',
    },
]
const propertyTypeOptions = [
    {
        value: '公寓',
        label: '公寓',
    },
    {
        value: '别墅',
        label: '别墅',
    },
    {
        value: '普通住宅',
        label: '普通住宅',
    },
    {
        value: '平房',
        label: '平房',
    },
    {
        value: '其他',
        label: '其他',
    }
]
const decorationOptions = [
    {
        value: '毛坯',
        label: '毛坯'
    },
    {
        value: '普通装修',
        label: '普通装修',
    },
    {
        value: '精装修',
        label: '精装修',
    },
    {
        value: '豪华装修',
        label: '豪华装修',
    },
]
const subwayOptions = [
    {
        value: '1号线',
        label: '1号线',
    },
    {
        value: '2号线',
        label: '2号线',
    },
    {
        value: '3号线',
        label: '3号线',
    },
    {
        value: '4号线',
        label: '4号线',
    },
    {
        value: '5号线',
        label: '5号线',
    },
    {
        value: '6号线',
        label: '6号线',
    },
    {
        value: '7号线',
        label: '7号线',
    },
    {
        value: '8号线',
        label: '8号线',
    },
    {
        value: '9号线',
        label: '9号线',
    },
    {
        value: '10号线',
        label: '10号线',
    },
    {
        value: '17号线',
        label: '17号线',
    },
    {
        value: '18号线',
        label: '18号线',
    },
    {
        value: '19号线',
        label: '19号线',
    },
    {
        value: '30号线',
        label: '30号线',
    },
    {
        value: '有轨电车蓉2号线',
        label: '有轨电车蓉2号线',
    }
]   
</script>
<style lang="scss" scoped>
.el-form {
    margin-top: 50px;
}
</style>