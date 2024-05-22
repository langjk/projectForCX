<template>
  <div style="display:flex;justify-content:space-between">
    <lightChart :lightData="lightData"></lightChart>
    <runChart :runData="runData"></runChart>
    <missionChart :missionData="missionData"></missionChart>
    <completeChart :completeData="completeData"></completeChart>
  </div>
</template>

<script>  
import { ref, onMounted, onUnmounted } from 'vue';  
import MqttClient from '../utils/mqttClient.js';  
import lightChart from '../components/lightMonitor/lightChart.vue';
import runChart from '../components/lightMonitor/runChart.vue';
import missionChart from '../components/lightMonitor/missionChart.vue';
import completeChart from '../components/lightMonitor/completeChart.vue';
export default {  
  components: {  
    lightChart,
    runChart,
    missionChart,
    completeChart
  },  
  data() {  
      return {  
        lightData: [{
          title:'类型1',count:Math.floor(Math.random() * 300),percent:Math.floor(Math.random() * 100)
        },{
          title:'类型2',count:Math.floor(Math.random() * 300),percent:Math.floor(Math.random() * 100)
        },{
          title:'类型3',count:Math.floor(Math.random() * 300),percent:Math.floor(Math.random() * 100)
        },{
          title:'类型4',count:Math.floor(Math.random() * 300),percent:Math.floor(Math.random() * 100)
        },{
          title:'类型5',count:Math.floor(Math.random() * 300),percent:Math.floor(Math.random() * 100)
        }],
        runData: [{
          title:'类型1',count:Math.floor(Math.random() * 300),percent:Math.floor(Math.random() * 100)
        },{
          title:'类型2',count:Math.floor(Math.random() * 300),percent:Math.floor(Math.random() * 100)
        },{
          title:'类型3',count:Math.floor(Math.random() * 300),percent:Math.floor(Math.random() * 100)
        },{
          title:'类型4',count:Math.floor(Math.random() * 300),percent:Math.floor(Math.random() * 100)
        },{
          title:'类型5',count:Math.floor(Math.random() * 300),percent:Math.floor(Math.random() * 100)
        }],
        missionData: {
          legend: {
            orient: 'vertical',
            right:0,
            textStyle:{color:'#F7FAFF'},
            top: 'center',
            data: ['执行完成', '执行中', '启动中','执行失败','强制停止']
          },
          color:['#31E6C5','#095AD4','#3888FF','#CF324E','#637088'],
          series: [
            {
              type: 'pie',
              width:'80%',
              left:-20,
              label: {
                show: false,
                position: 'center'
              },
              data: [
                {
                  value: Math.floor(Math.random() * 1000),
                  name: '执行完成'
                },
                {
                  value: Math.floor(Math.random() * 1000),
                  name: '执行中'
                },
                {
                  value: Math.floor(Math.random() * 1000),
                  name: '启动中'
                },
                {
                  value: Math.floor(Math.random() * 1000),
                  name: '执行失败'
                },
                {
                  value: Math.floor(Math.random() * 1000),
                  name: '强制停止'
                }
              ],
              radius: ['50%', '70%']
            }
          ]
        },
        completeData:{
          series:{
            type:'gauge',
            startAngle: 180,
            endAngle: 0,
            itemStyle: {
              color: '#f7faff'
            },
            progress: {
              show: true,
              width: 14,
              itemStyle:{
              color:'#095AD4'}
            },
            data: [
              {
                value: 96.18
              }
            ],
            axisLine: {
              lineStyle: {
                width: 14,
                color:[[1, '#0027666b']]
              }
            },
            axisTick: {
              show:false
            },
            axisLabel: {
              show:false
            },
            splitLine: {
              show:false
            },
            detail: {
              show:false
            },
            pointer: {
              length:'80%',
              width:4
            },
          },
        }
      }  
  },
  setup() {  
    const PublicMqtt = ref(null); 
    let subscription = 'testtopic/#'; // 假设你从某处获取这个值  
  
    const startMqtt = () => {  
      PublicMqtt.value = new MqttClient(subscription);  
      PublicMqtt.value.init();  
      PublicMqtt.value.link();  
      PublicMqtt.value.get(); // 立即开始监听消息  
    };  

    onMounted(() => {  
      // startMqtt();  
    });  
  
    onUnmounted(() => {  
      if (PublicMqtt.value) {  
        PublicMqtt.value.over();  
      }  
    });  
  
    return {  
    };  
  },  
};  
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>../utils/mqttClient.js
