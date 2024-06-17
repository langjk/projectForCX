<script>
import { inject, ref, watch } from 'vue'

export default {
  setup() {
    // 注入全局变量
    const injectedVariable = inject('broker')
    const light1 = inject('light1')
    const light2 = inject('light2')
    const light3 = inject('light3')

    // 创建一个局部的响应式变量来绑定输入框的值
    const localVariable = ref(injectedVariable)
    const locallight1 = ref(light1)
    const locallight2 = ref(light2)
    const locallight3 = ref(light3)

    // 监视 localVariable 的变化并同步更新 injectedVariable
    watch(localVariable, (newVal) => {
      injectedVariable.value = newVal
    })
    watch(locallight1, (newVal) => {
      light1.value = newVal
    })
    watch(locallight2, (newVal) => {
      light2.value = newVal
    })
    watch(locallight3, (newVal) => {
      light3.value = newVal
    })

    return {
      localVariable,
      locallight1,
      locallight2,
      locallight3
    }
  }
}

</script>

<template>
  <el-input v-model="localVariable"></el-input>
  <el-input v-model="locallight1"></el-input>
  <el-input v-model="locallight2"></el-input>
  <el-input v-model="locallight3"></el-input>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
