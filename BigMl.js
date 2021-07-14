

var bigml = require('bigml');
var connection = bigml.BigML('shaharglikman00',
                              '31ad2a093477b42b7417905e933564631112dbd8');
 var source = new bigml.Source(connection);
 var see='./data/iris.csv';
  source.create(see, function(error, sourceInfo) {
  if (!error && sourceInfo) {
    var dataset = new bigml.Dataset();
    dataset.create(sourceInfo, function(error, datasetInfo) {
      if (!error && datasetInfo) {
        var model = new bigml.Model();
        model.create(datasetInfo, function (error, modelInfo) {
          if (!error && modelInfo) {
            var prediction = new bigml.Prediction();
            prediction.create(modelInfo, {'petal length': 1})
          }
        });
      }
    });
  }
  });