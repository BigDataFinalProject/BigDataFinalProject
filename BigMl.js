

const bigml = require('bigml');
const username='shaharglikman00';
const password='31ad2a093477b42b7417905e933564631112dbd8';
//const project='project/60ef024de4279b249b002bcc';
const connection = new bigml.BigML(username,password);
connection.project='project/60ef024de4279b249b002bcc';
connection.organization="http://www.ilo.org/global/lang--en/index.htm";
const source = new bigml.Source(connection);
const see='./data/iris.csv';
  source.create(see, function(error, sourceInfo) {
  if (!error && sourceInfo) {
    var dataset = new bigml.Dataset(connection);
    dataset.create(sourceInfo, function(error, datasetInfo) {
      if (!error && datasetInfo) {
        var model = new bigml.Model(connection);
        model.create(datasetInfo, function (error, modelInfo) {
          if (!error && modelInfo) {
             var prediction = new bigml.Prediction(connection);
             
             setTimeout(() => { }, 5000);  //18/7 maybe a different way
             prediction.create(modelInfo, {'petal length': 1})
             
          }
        });
      }
    });
  }
  });