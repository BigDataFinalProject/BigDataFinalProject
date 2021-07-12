
bigml = require('bigml');
//connection = new bigml.BigML();
//connection = new bigml.BigML("shaharglikman00","7edc2b37f4e8f04b3d54f0e22dac6a977aea2032",true)
// connection = new bigml.BigML('shaharglikman00',
//                              '7edc2b37f4e8f04b3d54f0e22dac6a977aea2032',
//                              true);
connection = new bigml.BigML('shaharglikman00',
                             '7edc2b37f4e8f04b3d54f0e22dac6a977aea2032',
                             {domain: 'au.bigml.io',
                              protocol: 'https'});

                              
var bigml = require('bigml');
    var source = new bigml.Source();
    source.create('./data/Try.csv', function(error, sourceInfo) {
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