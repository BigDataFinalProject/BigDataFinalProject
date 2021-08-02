const bigml = require('bigml');
const { SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG } = require('constants');

const fs = require('fs');
var AsyncLock = require('async-lock');
const kafka = require('./kafkaProduce');

var lock = new AsyncLock();
see= function(id,Car) {
    console.log("see1");
    lock.acquire(id, function(done) {
        console.log(id + " Running operation")
        setTimeout(function() {
            see2(Car);
           
            //console.log(id + " Finishing operation")
            done();
        }, 3000)
    }, function(err, ret) {
        //console.log(id + " Freeing lock", ret)
    }, {});
  }

see2= function(Car){
   console.log("in see")
  var pred;
// read JSON object from file
fs.readFile('./data/user.json', 'utf-8', (err, data) => {
    if (err) {
        throw err;
    }

    // parse JSON object
const user = JSON.parse(data.toString());
const username='shaharglikman00';
const password='31ad2a093477b42b7417905e933564631112dbd8';
const connection = new bigml.BigML(username,password);
connection.project='project/60ef024de4279b249b002bcc';
connection.organization="http://www.ilo.org/global/lang--en/index.htm";
    var localModel = new bigml.LocalModel(user.modelInfo_resource,connection);
    localModel.predict({'Entrance_to_road': Car.Entrance_to_road,"hour":Car.hour,"direction":Car.direction,"type":Car.type},
                       function(error, prediction) {
                         const Prediction = {
                          "prediciton":parseInt(prediction.prediction)
                         };
                         const data = JSON.stringify( Prediction);
                         console.log("prediciton"+prediction.prediction)
                         Car.my_prediction=parseInt(prediction.prediction);
                      // write JSON string to a file
                      fs.writeFile('./data/Prediction.json', data, (err) => {
                          if (err) {
                              throw err;
                          }
                          console.log("JSON data is saved.");
                      });
                      t=JSON.parse(JSON.stringify(Car))
                      console.log(t);
                      kafka.publish(t) 
                      
                });                       
                                          
});

 
}


