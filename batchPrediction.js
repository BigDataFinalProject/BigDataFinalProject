const bigml = require('bigml');
const username='shaharglikman00';
const password='31ad2a093477b42b7417905e933564631112dbd8';
//const project='project/60ef024de4279b249b002bcc';
const connection = new bigml.BigML(username,password);
connection.project='project/60ef024de4279b249b002bcc';
connection.organization="http://www.ilo.org/global/lang--en/index.htm";

var batchPrediction = new bigml.BatchPrediction(connection),
tmpFileName='./data/prediction.txt';
       // batch prediction creation call
batchPrediction.create('model/60f9936d47d77512a70bfbf6','dataset/60f99357c1c0000b8602c7e2',{'name': 'my batch prediction'},
function(error, batchPredictionInfo) {
if (!error && batchPredictionInfo) {
            // retrieving batch prediction finished resource
    batchPrediction.get(batchPredictionInfo, true,
    function (error, batchPredictionInfo) {
         if (batchPredictionInfo.object.status.code === bigml.constants.FINISHED) {
                  // retrieving the batch prediction output file and storing it
                  // in the local file system
                  batchPrediction.download(batchPredictionInfo,
                                           tmpFileName,
                    function (error, cbFilename) {
                      console.log(cbFilename);
                    });
          }
    });
}
});