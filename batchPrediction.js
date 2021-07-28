const bigml = require('bigml');

const fs = require('fs');

see= function(){
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




    console.log("see"+data)
    var localModel = new bigml.LocalModel(user.modelInfo_resource,connection);
    localModel.predict({'petal length': 1},
                       function(error, prediction) {
                         const Prediction = {
                          "prediciton":prediction.prediction
                         };
                        
                         const data = JSON.stringify( Prediction);
                      
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


