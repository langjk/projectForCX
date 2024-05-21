<template>
    <el-menu mode="vertical" 
    default-active="lightMonitor" class="menu"
    :router="true">
        <el-menu-item index="lightMonitor">
            <template #title>灯光监控中心</template>
        </el-menu-item>
        <el-menu-item index="anionMonitor">
            <template #title>负离子监控中心</template>
        </el-menu-item>
    </el-menu>
</template>
<style scoped>
.menu{
    background-color: rgb(36,40,51);
    color: white;
    padding:10px;
    height:100%;
    width:270px;
    border-right:none;
}
.el-menu-item{
    color:white;
    border-radius: 5px;
    font-weight: bold;
    font-size:15px;
}
.el-menu-item.is-active{
    background-color: rgb(60,93,246);
    color:white;
}
.el-menu-item:hover{
    background-color:rgb(87,92,106)
}
.el-menu-item.is-active:hover{
    background-color: rgb(60,93,246);
}
</style>