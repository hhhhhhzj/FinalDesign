<template>
    <div>
        <h1>Admin Home</h1>
    </div>
</template>

<script setup>
import axios from 'axios'
axios.get('/adminapi/user/adminhome').then(res=>{
    console.log(res.data);
})
</script>