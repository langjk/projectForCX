<template>  
    <div class="container">
        <div class="title">今日任务执行监控</div>
        <div class="totalNum">2918</div>
        <div class="unit">今日运行数(个)</div>  
        <div id="main" style="width: 100%;height:300px;"></div>
    </div>
</template>  

<script>  
import { onMounted, onUnmounted, ref } from 'vue'  
import * as echarts from 'echarts' // 确保您已经安装了echarts并正确导入了它  

export default {  
    props: {  
        missionData: {  
            type: Object,  
            required: true  
        }  
    },  
    setup(props) {  
        const myChart = ref(null); // 使用 ref 创建一个响应式引用  
        onMounted(() => {  
            const chartDom = document.getElementById('main');  
            if (chartDom) {  
                myChart.value = echarts.init(chartDom); // 初始化echarts实例  
                myChart.value.setOption(props.missionData); // 设置图表选项  
                window.addEventListener('resize', function() {
                    myChart.value.resize();
                });
            }  
        });  

        onUnmounted(() => {  
            if (myChart.value) {  
                myChart.value.dispose(); // 组件卸载时清理echarts实例  
            }  
        });  
    }  
}  
</script>
<style scoped>
.container{
    width:20%;
    height:400px;
    background-color: rgb(36,40,51);
    border-radius: 10px;
    color:#F7FaFF;
    text-align: start;
    padding:20px;
}
.title{
    font-size:20px;
    font-weight: bold
}
.totalNum{
    font-size:40px;
    font-weight: bold;
    margin-top:20px;
}
.unit{
    font-size: 15px;
}
</style>