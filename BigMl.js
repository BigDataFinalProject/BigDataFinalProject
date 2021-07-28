

const bigml = require('bigml');
const BatchPrediction = require('bigml/lib/BatchPrediction');
const BigML = require('bigml/lib/BigML');
const Resource = require('bigml/lib/Resource');
const username='shaharglikman00';
const password='31ad2a093477b42b7417905e933564631112dbd8';
//const project='project/60ef024de4279b249b002bcc';
const connection = new bigml.BigML(username,password);
connection.project='project/60ef024de4279b249b002bcc';
connection.organization="http://www.ilo.org/global/lang--en/index.htm";
const source = new bigml.Source(connection);
const see='./data/iris.csv';
const fs = require('fs');

module.exports.publish=function(){

  source.create(see,function(error, sourceInfo) {
  if (!error && sourceInfo) {
    var dataset = new bigml.Dataset(connection);
    dataset.create(sourceInfo, function(error, datasetInfo) {
      var dataset_resource=datasetInfo.resource; //23/7
      if (!error && datasetInfo) {
        var model = new bigml.Model(connection);
        model.create(datasetInfo,function (error, modelInfo) {
          if (!error && modelInfo) {
           var model_resource=modelInfo.resource;  //23/7
           const user = {
            "modelInfo_resource": modelInfo.resource,
            "datasetInfo_resource": datasetInfo.resource
           };
          
           const data = JSON.stringify(user);
        
        // write JSON string to a file
        fs.writeFile('./data/user.json', data, (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.");
        });
        //    var prediction = new bigml.Prediction(connection);
        //    setTimeout(() => { }, 8000);  //18/7 maybe a different way
        //    prediction.create(modelInfo, {"petal length":1})
          }
        });
      }
    });
  }
  });


}
