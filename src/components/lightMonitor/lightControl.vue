<template>
    <div class="subLightContainer">
        <div class="title">{{ title }}</div>
        <el-switch class="switch"
            v-model="switchStatus"
            inline-prompt
            style="--el-switch-on-color:rgb(14,209,239); --el-switch-off-color:rgb(221,43,67)"
            active-text="开"
            inactive-text="关"
            :loading="loading"
            @change="handleChange"
        />
        <div class="lightGroup">
            <div class="subGroup" v-for="i in 6" :key="i">
                <div class="imgContainer">
                    <img style="height:100% " :src="(switchStatus == 1) ? lightOnRef : lightOffRef"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import lightOn from '@/assets/lightOn.png'
import lightOff from '@/assets/lightOff.png'
import { ElMessage } from 'element-plus'
export default {
    props: {  
        title: {  
            type: String,  
            required: true  
        },
    },
    setup(props,{ emit }) {
        const switchStatus = ref(false)
        const lightOnRef = ref(lightOn)  
        const lightOffRef = ref(lightOff) 
        const loading = ref(false) 
        let timeoutId = null;
        const timeStatus = ref(false)
        const changeSwitch = (value,flag) => {
            clearTimeout(timeoutId);
            loading.value = false;
            if(flag == false){
                switchStatus.value = !switchStatus.value
                if(timeStatus.value == true){
                    ElMessage({
                        message: '边缘节点没有响应',
                        type: 'error',
                    })
                    timeStatus.value = false
                }
                else
                    ElMessage({
                        message: '设置失败',
                        type: 'error',
                    })
            }
            else if(flag == true){
                if(value == "1")
                    switchStatus.value = true
                else
                    switchStatus.value = false
            }
        }
        const handleChange = () => {
            loading.value = true
            emit('switch-changed', switchStatus.value);
            timeoutId = setTimeout(() => {
                timeStatus.value = true;
                changeSwitch(false,false);
            }, 10000);
        }
        return{
            switchStatus,
            lightOnRef,
            lightOffRef,
            loading,
            changeSwitch,
            handleChange
        }
    },
}
</script>
<style scoped>
.subLightContainer{
    width:30%;
    padding:20px;
}
.title{
    font-size:25px;
    font-weight: bold;
}
.lightGroup{
    display:flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    height:100%;
}
.subGroup{
    width:40%
}
.switch{
    margin-bottom:20px;
}
.imgContainer{
    height:70px;
    overflow: hidden;
}
</style>