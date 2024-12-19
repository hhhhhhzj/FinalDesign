<template>
    <div>
        <el-page-header content="个人中心" icon="" title="后台管理系统" />
        <el-row :gutter="20" class="el-row">
            <el-col :span="8">
                <el-card class="box-card">
                    <el-avatar :size=100 :src="avatarUrl" />
                    <h3>{{ store.state.userInfo.username }}</h3>
                    <h3>管理员</h3>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span>个人信息</span>
                        </div>
                    </template>
                    <el-form ref="userFormRef" style="max-width: 600px" :model="userForm" :rules="userFormRules"
                        label-width="auto" class="demo-ruleForm" status-icon>
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="userForm.username" />
                        </el-form-item>
                        <el-form-item label="电话号码" prop="phone">
                            <el-input v-model="userForm.phone" />
                        </el-form-item>
                        <el-form-item label="性别" prop="gender">
                            <el-select v-model="userForm.gender" placeholder="Select" style="width: 100%">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="个人简介" prop="introduction">
                            <el-input type="textarea" v-model="userForm.introduction" />
                        </el-form-item>
                        <el-form-item label="头像" prop="avatar">
                            <el-upload class="avatar-uploader"
                                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                                :show-file-list="false" :auto-upload="false"
                                :on-change="handleChange">
                                <img v-if="userForm.avatar" :src="userForm.avatar" class="avatar" />
                                <el-icon v-else class="avatar-uploader-icon">
                                    <Plus />
                                </el-icon>
                            </el-upload>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm(ruleFormRef)">
                                更新
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { computed, ref, reactive } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import axios from 'axios';

const store = useStore()
const avatarUrl = computed(
    () => store.state.userInfo.avatarUrl ? store.state.userInfo.avatarUrl : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
)
const { username, phone, gender, introduction, avatar } = store.state.userInfo
const userFormRef = ref()
const userForm = reactive({
    username,
    gender,
    introduction,
    phone,
    avatar,
    file: null,
})
const userFormRules = reactive({
    username: [
        { required: true, message: '请输入名字', trigger: 'blur' },
    ],
    phone: [
        { required: true, message: '请输入电话号码', trigger: 'blur' },
    ],
    gender: [
        { required: true, message: '请选择性别', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: '请输入简介', trigger: 'blur' },
    ],
    avatar: [
        { required: true, message: '请上传头像', trigger: 'blur' },
    ],
})
//性别选择
const options = [
    {
        value: 0,
        label: '保密',
    },
    {
        value: 1,
        label: '男',
    },
    {
        value: 2,
        label: '女',
    },
] 

//每次选择完图片之后的回调
const handleChange = (file) => {
    userForm.avatar = URL.createObjectURL(file.raw);
    userForm.file = file.raw;   
}
//更新提交
const submitForm = () => {
    userFormRef.value.validate((valid) => {
        if (valid) {
            console.log('submit');
            const params = new FormData();
            for(let i in userForm){
                params.append(i,userForm[i])
            }
            console.log(params);
            
            axios.post('/adminapi/user/upload',params,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }).then(res=>{
                console.log(res.data);
                
            })
        }
    })
}
</script>
<style lang="scss" scoped>
.el-row {
    margin-top: 20px;

    .box-card {
        text-align: center;
    }
}

::v-deep .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}
.avatar {
    width: 178px;
    height: 178px;
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>