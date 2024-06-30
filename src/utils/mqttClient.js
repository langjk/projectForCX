import mqtt from 'mqtt'

//封装一个类（可直接cv）
class MqttClient{
    //创建公共变量
    static url; //mqtt地址
    static oldSubscribe; //取消订阅准备
    static subscribe; //订阅地址
    static client; //mqtt公共变量
    constructor(url,subscribe) {
        console.log( "订阅地址:",subscribe);
        console.log( "url:",url.value);
        //获取传递来的订阅地址
        this.subscribe = subscribe;
        this.url = url;
    }

    //初始化mqtt
    init() {
        const options = {
            clean: true, // true: 清除会话, false: 保留会话
            connectTimeout: 4000, // 超时时间
        };
        this.client = mqtt.connect(this.url, options);
        this.client.on("error", (error) => {});
        this.client.on("reconnect", (error) => {});
    }
    //取消订阅
    unsubscribes() {
        this.client.unsubscribe(this.subscribe, (error) => {
            if (!error) {
            console.log(this.subscribe, "取消订阅成功");
            } else {
            console.log(this.subscribe, "取消订阅失败");
            }
        });
    }
    //结束链接
    over() {
        this.client.end();
    }
    //链接
    link() {
        this.client.on("connect", (e) => {
            this.client.subscribe(this.subscribe, (error) => {
            //在js代码中最简单的抛出异常方法
            if (!error) {
                console.log("订阅成功");
            } else {
                console.log("订阅失败");
            }
            });
        });
    }
    //收到的消息
    get(onMessageCallback) {
        this.client.on("message", (topic, message) => {
            if (onMessageCallback) {
                onMessageCallback(topic, message.toString());
            }
        });
    }
    //发送消息
    publish(topic, message) {
        this.client.publish(topic, message, (error) => {
            if (!error) {
                console.log("消息发送成功,topic:"+topic);
            } else {
                console.error("消息发送失败", error);
            }
        });
    }
}
export default MqttClient;