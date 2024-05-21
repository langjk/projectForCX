<script setup>
import MainHeader from './components/common/header.vue'
import MainAside from './components/common/aside.vue'
</script>

<template>
  <el-container style="height:100%">
    <el-header>
      <MainHeader></MainHeader>
    </el-header>
    <el-container>
      <el-aside>
        <MainAside></MainAside>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
</style>
