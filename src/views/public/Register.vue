<template>
    <div>
        <vue-particles id="tsparticles" :options="options" />
        <div class="formContainer">

            <h3>注册账号</h3>

            <el-form ref="userFormRef" style="max-width: 600px" :model="userForm" :rules="userFormRules"
                label-width="80px" class="demo-ruleForm" status-icon>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userForm.username" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="userForm.password" />
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input type="phone" v-model="userForm.phone" />
                </el-form-item>
                <el-form-item label="个人简介" prop="introduction">
                    <el-input type="textarea" v-model="userForm.introduction" />
                </el-form-item>
                <el-form-item label="头像" prop="avatar">
                    <Upload :avatar="userForm.avatar" @kerwinchange="handleChange" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">
                        注册
                    </el-button>
                    <el-button type="default" @click="router.push('/login')">
                        返回登陆
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>


<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import Upload from '@/components/mainbox/Upload.vue';


const userFormRef = ref()
const userForm = reactive({
    username: '',
    password: '',
    phone: '',
    role: 2,//1为管理员，2为编辑
    introduction: '',
    avatar: '',
    file: null
})
const userFormRules = reactive({
    username: [{
        required: true,
        message: '请输入用户名',
        trigger: 'blur'
    }],
    password: [{
        required: true,
        message: '请输入密码',
        trigger: 'blur'
    }],
    phone: [{
        required: true,
        message: '请输入手机号',
        trigger: 'blur'
    }],
})
const router = useRouter();
//表单提交函数
const submitForm = () => {
    userFormRef.value.validate((valid) => {
        if (valid) {
            //提交数据到后端
            console.log('submitForm', userForm)
        }
    })
}

//每次选择完图片之后的回调
const handleChange = (file) => {
    userForm.avatar = URL.createObjectURL(file);
    userForm.file = file;
}

//配置particles.js参数
const options = {
    background: {
        color: {
            value: '#2d3a4b'
        }
    },
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: 'push'
            },
            onHover: {
                enable: true,
                mode: 'repulse'
            },
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40
            },
            push: {
                quantity: 4
            },
            repulse: {
                distance: 200,
                duration: 0.4
            }
        }
    },
    particles: {
        color: {
            value: '#ffffff'
        },
        links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
        },
        move: {
            direction: 'none',
            enable: true,
            outModes: 'bounce',
            random: false,
            speed: 6,
            straight: false
        },
        number: {
            density: {
                enable: true,
            },
            value: 80
        },
        opacity: {
            value: 0.5
        },
        shape: {
            type: 'circle'
        },
        size: {
            value: { min: 1, max: 5 }
        }
    },
    detectRetina: true
}
</script>
<style lang="scss" scoped>
.formContainer {
    width: 500px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba($color: #000000, $alpha: 0.7);
    color: white;
    border-radius: 10px;
    text-align: center;
    padding: 20px;

    h3 {
        font-size: 30px;
    }

    .loginform {
        margin-top: 20px;
    }
}

:deep(.el-form-item__label) {
    color: white;
}
</style>