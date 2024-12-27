<template>
    <div>
        <el-page-header content="编辑房源" icon="" title="房源管理" />
        <el-form
            ref="houseFormRef"
            style="max-width: 800px"
            :model="houseForm"
            :rules="houseFormRules"
            label-width="80px"
            class="demo-ruleForm"
            status-icon
        >
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
                <el-input-number v-model="houseForm.floor" :min="1" placeholder="请输入楼层" style="width: 100%;" />
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

            <!-- 已上传图片 -->
            <el-form-item label="室内图片" prop="houseImg">
                <div class="image-preview">
                    <div
                        v-for="(img, index) in existingImages"
                        :key="index"
                        class="image-item"
                    >
                        <el-image
                            :src="`http://localhost:3000${img}`"
                            style="width: 100px; height: 100px"
                        />
                        <div class="image-overlay" @click="handleRemoveImage(img, index)">
                            <el-icon>
                                <DeleteFilled style="color: white; font-size: 20px;" />
                            </el-icon>
                        </div>
                    </div>
                </div>
            </el-form-item>

            <!-- 新增图片上传 -->
            <el-form-item label="新增图片" prop="houseImg">
                <MultiUpload v-model="houseForm.houseImg" :max-count="5" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm(houseFormRef)">更新房源</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import MultiUpload from "@/components/mainbox/MultiUpload.vue";
import { ElMessage } from "element-plus";
import axios from "axios";
import { useRoute } from "vue-router";
import { DeleteFilled } from "@element-plus/icons-vue";

const route = useRoute();
const houseFormRef = ref();
const houseForm = reactive({
    title: "",
    price: 0,
    area: 0,
    decoration: "",
    buildTime: "",
    orientation: "",
    floor: 1,
    subway: "1",
    perSquarePrice: 0,
    roomNum: "",
    hallNum: "",
    toiletNum: "",
    propertyType: "",
    community: "",
    address: "",
    sellPoint: "",
    ownerMood: "",
    houseImg: [],
});

// 已存在的图片列表
const existingImages = ref([]);
const deletedImages = ref([]);

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
    floor: [
        { required: true, message: '请输入楼层', trigger: 'blur' },
        {
            type: 'number',
            min: 1,
            message: '楼层必须是大于 0 的正整数',
            trigger: 'blur',
        },
    ],
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
    houseImg: [
        {
            validator: (rule, value, callback) => {
                // 计算现有图片和新上传图片的总和
                const existingLength = existingImages ? existingImages.value?.length || 0 : 0;
                const newLength = value ? value.length : 0;
                const totalImages = existingLength + newLength;

                // 验证总数是否超过限制
                if (totalImages > 5) {
                    callback(new Error('图片总数不能超过5张'));
                } else {
                    callback();
                }
            },
            trigger: 'change',
        },
    ],
})

const handleRemoveImage = (img, index) => {
    deletedImages.value.push(img); // 将被删除的图片路径保存到删除列表
    existingImages.value.splice(index, 1); // 从现有列表中移除
};

// 加载数据
onMounted(async () => {
    const res = await axios.get(`/adminapi/house/list/${route.params.id}`);
    Object.assign(houseForm, res.data.data[0]);
    existingImages.value = res.data.data[0].houseImg; // 加载已存在的图片
});

// 提交数据
const submitForm = async () => {
    houseFormRef.value.validate(async (valid) => {
        if (valid) {
            const formData = new FormData();

            // 添加表单字段
            Object.keys(houseForm).forEach((key) => {
                if (key !== "houseImg") {
                    formData.append(key, houseForm[key]);
                }
            });

            // 添加现有图片路径
            formData.append("existingImages", JSON.stringify(existingImages.value));

            // 添加新上传的图片
            houseForm.houseImg.forEach((file) => {
                if (file.raw) {
                    formData.append("newImages", file.raw);
                }
            });

            // 添加删除的图片路径
            formData.append("deletedImages", JSON.stringify(deletedImages.value));

            try {
                const res = await axios.post(`/adminapi/house/update/${route.params.id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                if (res.data.ActionType === "ok") {
                    ElMessage.success("房源更新成功");
                } else {
                    ElMessage.error("房源更新失败");
                }
            } catch (error) {
                ElMessage.error("提交失败，请稍后再试");
                console.error("提交失败:", error);
            }
        }
    });
};

const props = { expandTrigger: "hover" };
// 地址、朝向等选项省略
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
        value: '无',
        label: '无',
    },
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

<style scoped>
.el-form {
    margin-top: 50px;
}
.image-preview {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
.image-item {
    position: relative;
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 5px;
}
.image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s;
    cursor: pointer;
}
.image-item:hover .image-overlay {
    opacity: 1;
}
</style>