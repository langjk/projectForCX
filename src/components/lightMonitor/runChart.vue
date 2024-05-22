<template>  
    <div class="container">
        <div class="title">运行监控</div>
        <div class="totalNum">{{runTotal}}</div>
        <div class="unit">今日运行数(个)</div>
        <el-table style="margin-top:20px;" :data="runData">
            <el-table-column label="类型" prop="title">
            </el-table-column>
            <el-table-column label="总数" prop="count" align="right">
                <template #default="scope">
                    <div>
                        <el-progress :percentage="scope.row.percent">
                        <div>{{ scope.row.count }}</div>
                        </el-progress>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-button class="showMore" link>
            查看更多 >
        </el-button>
        <!-- <div id="main" style="width: 600px;height:400px;"></div> -->
    </div>
</template>  

<script>  
import { onMounted, onUnmounted, ref } from 'vue'  
import * as echarts from 'echarts' // 确保您已经安装了echarts并正确导入了它  

export default {  
    props: {  
        runData: {  
            type: Array,  
            required: true  
        },
        runTotal: {
            type: Number,
            required: true
        }  
    },  
    setup(props) {  
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
    font-family: "DINPro-Bold";
}
.unit{
    font-size: 15px;
}
.showMore{
    float:right;
    font-size:12px;
    color:#f7faffaf;
}
@keyframes progress {
    from {
    width: 0;
    }
    to {
    }
}
:deep(.el-progress-bar__inner){
    animation: progress ease;
    animation-duration:1s !important;
}
</style>