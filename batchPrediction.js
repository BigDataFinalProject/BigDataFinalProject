const bigml = require('bigml');

const fs = require('fs');

see= function(Car){

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
    localModel.predict({'Entrance_to_road': Car.Entrance_to_road,"hour":Car.hour,"direction":Car.direction},
                       function(error, prediction) {
                         const Prediction = {
                          "prediciton":parseInt(prediction.prediction)
                         };
                         const data = JSON.stringify( Prediction);
                         Car.my_prediction=parseInt(prediction.prediction);
                         console.log("obj_car"+JSON.stringify(Car))
                      // write JSON string to a file
                      fs.writeFile('./data/Prediction.json', data, (err) => {
                          if (err) {
                              throw err;
                          }
                          console.log("JSON data is saved.");
                      });
                         //return pred;
                         });
                         
});
}


