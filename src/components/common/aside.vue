<template>
    <el-menu mode="vertical" 
    :default-active="route.path"
    class="menu"
    :router="true">
        <el-menu-item index="/lightMonitor">
            <template #title>灯光监控中心</template>
        </el-menu-item>
        <el-menu-item index="/anionMonitor">
            <template #title>负氧离子监控中心</template>
        </el-menu-item>
    </el-menu>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router'
const route = useRoute();
</script>
<style scoped>
.menu{
    background-color: rgb(36,40,51);
    padding:10px;
    height:100%;
    width:270px;
    border-right:none;
}
.el-menu-item{
    color:#F7FaFF;
    border-radius: 5px;
    font-weight: bold;
    font-size:15px;
}
.el-menu-item.is-active{
    background-color: #0062ff;
    color:#F7FaFF;
}
.el-menu-item:hover{
    background-color:#575C6A
}
.el-menu-item.is-active:hover{
    background-color: #0062ff;
}
</style>