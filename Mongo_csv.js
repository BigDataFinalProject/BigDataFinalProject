const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
//const url = "mongodb://localhost:27017/";
const uri = "mongodb+srv://ariel:ariel123@cluster0.dcgiy.mongodb.net/ariel2?retryWrites=true&w=majority";
const Json2csvParser = require('json2csv').Parser;

module.exports.publish= function (){
// Create a connection to the MongoDB database
         MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
               if (err) throw err;
  
               let dbo = db.db("ariel2");
  
               dbo.collection("test2").find({}).toArray(function(err, result) {
               if (err) throw err;
               console.log(result);
	
	
	           //-> Convert JSON to CSV data
	           const csvFields = ['name', 'insert', 'out','color']; //not inserting by Fields -//12/7
	           const json2csvParser = new Json2csvParser({ csvFields });
	           const csv = json2csvParser.parse(result);

	          fs.writeFile('./data/cars.csv', csv, function(err) {
		          if (err) throw err;
		          console.log('file saved');
	         });

    
	
            db.close();
          });
});
}