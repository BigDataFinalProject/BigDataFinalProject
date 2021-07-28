const bigml = require('bigml');

const fs = require('fs');

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

   var prediction = new bigml.Prediction(connection);
   setTimeout(() => { }, 8000);  //18/7 maybe a different way
   prediction.create(user.modelInfo_resource, {"petal length":1})
   

var batchPrediction = new bigml.BatchPrediction(connection),
tmpFileName='./data/prediction.txt';
       //batch prediction creation call
batchPrediction.create(user.modelInfo_resource,user.datasetInfo_resource,{'name': 'see'},
function(error, batchPredictionInfo) {
if (!error && batchPredictionInfo) {
            // retrieving batch prediction finished resource
    batchPrediction.get(batchPredictionInfo, true,
    function (error, batchPredictionInfo) {
         if (batchPredictionInfo.object.status.code === bigml.constants.FINISHED) {
                  // retrieving the batch prediction output file and storing it
                  // in the local file system
                  batchPrediction.download(batchPredictionInfo,tmpFileName,
                    function (error, cbFilename) {
                      console.log(cbFilename);
                    });
          }
    });
}
});

});

