<template>
  <div style="display:flex;justify-content:space-between">
    <lightChart :lightTotal="lightTotal" :lightData="lightData"></lightChart>
    <runChart :runTotal="runTotal" :runData="runData"></runChart>
    <missionChart :missionTotal="missionTotal" :missionData="missionData"></missionChart>
    <completeChart :completeData="completeData"></completeChart>
  </div>
  <div class="lightContainer">
    <lightControl :title="'第一组灯光'" @switch-changed="(value) => handleSwitchChange(value, 1)"
      ref="light1Child"></lightControl>
    <lightControl :title="'第二组灯光'" @switch-changed="(value) => handleSwitchChange(value, 2)"
      ref="light2Child"></lightControl>
    <lightControl :title="'第三组灯光'" @switch-changed="(value) => handleSwitchChange(value, 3)"
      ref="light3Child"></lightControl>
  </div>
</template>

<script>  
import { ref, onMounted, onUnmounted, onBeforeUnmount, inject } from 'vue';  
import MqttClient from '../utils/mqttClient.js';  
import lightChart from '../components/lightMonitor/lightChart.vue';
import runChart from '../components/lightMonitor/runChart.vue';
import missionChart from '../components/lightMonitor/missionChart.vue';
import completeChart from '../components/lightMonitor/completeChart.vue';
import lightControl from '../components/lightMonitor/lightControl.vue';
export default {  
  components: {  
    lightChart,
    runChart,
    missionChart,
    completeChart,
    lightControl
  }, 
  setup() {  
    const PublicMqttLight1 = ref(null); 
    const PublicMqttLight2 = ref(null); 
    const PublicMqttLight3 = ref(null); 
    const lightData= ref([{
        title:'类型1',count:Math.floor(Math.random() * 300),percent:Math.floor(Math.random() * 100)
      },{
        title:'类型2',count:Math.floor(Math.random() * 300),percent:Math.floor(Math.random() * 100)
      },{
        title:'类型3',count:Math.floor(Math.random() * 300),percent:Math.floor(Math.random() * 100)
      },{
        title:'类型4',count:Math.floor(Math.random() * 300),percent:Math.floor(Math.random() * 100)
      },{
        title:'类型5',count:Math.floor(Math.random() * 300),percent:Math.floor(Math.random() * 100)
    }])
    const runData = ref([{
      title:'类型1',count:Math.floor(Math.random() * 300),percent:Math.floor(Math.random() * 100)
    },{
      title:'类型2',count:Math.floor(Math.random() * 300),percent:Math.floor(Math.random() * 100)
    },{
      title:'类型3',count:Math.floor(Math.random() * 300),percent:Math.floor(Math.random() * 100)
    },{
      title:'类型4',count:Math.floor(Math.random() * 300),percent:Math.floor(Math.random() * 100)
    },{
      title:'类型5',count:Math.floor(Math.random() * 300),percent:Math.floor(Math.random() * 100)
    }])
    const missionData=ref({
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
    }) 
    const completeData = ref({
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
    })
    const lightTotal = ref(4841)
    const runTotal = ref(853)
    const missionTotal = ref(1250)
    const sn1 = inject('light1').value
    const sn2 = inject('light2').value
    const sn3 = inject('light3').value
    const subscriptionLight1 = 'cloud/' + sn1 + '/cmd';  
    const subscriptionLight2 = 'cloud/' + sn2 + '/cmd';  
    const subscriptionLight3 = 'cloud/' + sn3 + '/cmd';  
    const light1Child = ref(null);
    const light2Child = ref(null);
    const light3Child = ref(null);
    let intervalId = null;
    let url = inject('broker')
    const updateRandomData = () => {  
      lightTotal.value = 0
      runTotal.value = 0
      missionTotal.value = 0
      lightData.value.forEach(item => {  
        item.count = Math.floor(Math.random() * 1000);  
        item.percent = Math.floor(Math.random() * 100);  
        lightTotal.value += item.count
      });  
      runData.value.forEach(item => {  
        item.count = Math.floor(Math.random() * 300);  
        item.percent = Math.floor(Math.random() * 100);  
        runTotal.value += item.count
      });  
      missionData.value.series[0].data.forEach(item => {  
        item.value = Math.floor(Math.random() * 1000);   
        missionTotal.value += item.value
      }); 
      completeData.value.series.data[0].value = Math.floor(Math.random() * 10000) / 100;
    };  
    const startMqtt = () => {  
      PublicMqttLight1.value = new MqttClient(url,subscriptionLight1 + '/cack');  
      PublicMqttLight1.value.init();  
      PublicMqttLight1.value.link();  
      PublicMqttLight1.value.get((topic, message) => {
        let valid = JSON.parse(message)
        console.log(`Topic: ${topic}, Message: ${valid.valid}`);
        light1Child.value.changeSwitch(valid.valid == "1");
      });
      PublicMqttLight2.value = new MqttClient(url,subscriptionLight2 + '/cack');  
      PublicMqttLight2.value.init();  
      PublicMqttLight2.value.link();  
      PublicMqttLight2.value.get((topic, message) => {
        let valid = JSON.parse(message)
          console.log(`Topic: ${topic}, Message: ${valid.valid}`);
        if (light2Child.value) {
          light2Child.value.changeSwitch(valid.valid == "1");
        }
      });
      PublicMqttLight3.value = new MqttClient(url,subscriptionLight3 + '/cack');  
      PublicMqttLight3.value.init();  
      PublicMqttLight3.value.link();  
      PublicMqttLight3.value.get((topic, message) => {
        let valid = JSON.parse(message)
          console.log(`Topic: ${topic}, Message: ${valid.valid}`);
        if (light3Child.value) {
          light3Child.value.changeSwitch(valid.valid == "1");
        }
      });
    };  
    
    const handleSwitchChange = (value,group) => {
      console.log(value,group)
      let status = 0;
      if(value == true)
        status = 1
      let msg = {	
              pKey:"LCON01G",
              dname:"LCON",
              sn: "LCON202408201704888",
              type:"rtg",
              datacom:{
              }	
          }
      switch ( group ){
        case 1:
          msg.sn = sn1
          msg.pKey = "LCON0" + group + "G"
          msg.datacom[`Light00${group}0001Set`] = status
          msg.datacom[`Light00${group}0002Set`] = status
          if(PublicMqttLight1.value)
            PublicMqttLight1.value.publish(subscriptionLight1,JSON.stringify(msg))
          break
        case 2:
          msg.sn = sn2
          msg.pKey = "LCON0" + group + "G"
          msg.datacom[`Light00${group}0001Set`] = status
          msg.datacom[`Light00${group}0002Set`] = status
          if(PublicMqttLight2.value)
            PublicMqttLight2.value.publish(subscriptionLight2,JSON.stringify(msg))
          break
        case 3:
          msg.sn = sn3
          msg.pKey = "LCON0" + group + "G"
          msg.datacom[`Light00${group}0001Set`] = status
          msg.datacom[`Light00${group}0002Set`] = status
          if(PublicMqttLight3.value)
            PublicMqttLight3.value.publish(subscriptionLight3,JSON.stringify(msg))
          break
        default:break;
      }
    }

    onMounted(() => {  
      intervalId = setInterval(updateRandomData, 2000);
      startMqtt();  
    });  

    onBeforeUnmount(() => {  
      clearInterval(intervalId); // 在组件卸载前清除定时器  
    });

    onUnmounted(() => {  
      if (PublicMqttLight1.value) {  
        PublicMqttLight1.value.over();  
      }  
      if (PublicMqttLight2.value) {  
        PublicMqttLight2.value.over();  
      }  
      if (PublicMqttLight3.value) {  
        PublicMqttLight3.value.over();  
      }  
    });  
  
    return {  
      lightData,
      runData,
      missionData,
      completeData,
      lightTotal,
      runTotal,
      missionTotal,
      light1Child,
      light2Child,
      light3Child,
      handleSwitchChange
    };  
  },  
};  
</script>

<style scoped>
.lightContainer{
    background-color: rgb(36,40,51);
    width:100%;
    height:500px;
    border-radius: 10px;
    margin-top:20px;
    display: flex;
    justify-content: space-between;
}
</style>../utils/mqttClient.js
