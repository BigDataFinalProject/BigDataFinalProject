// https://www.cloudkarafka.com/ הפעלת קפקא במסגרת ספק זה

const uuid = require("uuid");
const Kafka = require("node-rdkafka");
const { MongoBulkWriteError, MongoClient } = require("mongodb");
//11/7
var server = require('http').createServer(Kafka.KafkaConsume);
const io = require("socket.io")(server)

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
//const prefix = process.env.CLOUDKARAFKA_USERNAME;

const topics = [topic];
const consumer = new Kafka.KafkaConsumer(kafkaConf, {
  "auto.offset.reset": "beginning"
});

consumer.on("error", function(err) {
  console.error(err);
});
consumer.on("ready", function(arg) {
  console.log(`Consumer ${arg.name} ready`);
  consumer.subscribe(topics);
  consumer.consume();
});

consumer.on("data", function(m) {
//can we use here send to mongodb code as a variable ?-shahar
 console.log(m.value.toString());
 //11/7
 
 const DbHelper = require ('./Mongo'); // import all file and name it DbHelper
 check(m.value.toString());  //we send the message to mongo db

 var redis = require('./RedisForArielSender')
 sendredis(m.value.toString());
 //var redis2 = require('./RedisForArielReciver')


 
 
});


consumer.on("disconnected", function(arg) {
  process.exit();
});
consumer.on('event.error', function(err) {
  console.error(err);
  process.exit(1);
});
// consumer.on('event.log', function(log) {
//   console.log(log);
// });
consumer.connect();