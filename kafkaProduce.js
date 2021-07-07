// https://www.cloudkarafka.com/ הפעלת קפקא במסגרת ספק זה

const uuid = require("uuid");
const Kafka = require("node-rdkafka");

const kafkaConf = {
  "group.id": "cloudkarafka-example",
  "metadata.broker.list": "dory-01.srvs.cloudkafka.com:9094,dory-02.srvs.cloudkafka.com:9094,dory-03.srvs.cloudkafka.com:9094".split(","),
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": "ixylgbeh",
  "sasl.password": "N-a_kLcPk1vTSfMqyBEN8gVmPg4XFwid",
  "debug": "generic,broker,security"
};

const prefix = "ixylgbeh-";
const topic = `${prefix}new`;
const producer = new Kafka.Producer(kafkaConf);

const genMessage = m => new Buffer.alloc(m.length,m);

producer.on("ready", function(arg) {
  console.log(`producer Ariel is ready.`);
});
producer.connect();

module.exports.publish= function(msg)
{ 
  console.log("publish");  
  m=JSON.stringify(msg);
  producer.produce(topic, -1, genMessage(m), uuid.v4());  
  //producer.disconnect();   
}




