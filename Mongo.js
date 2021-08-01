
const { MongoClient } = require('mongodb'); //we made "npm install mongodb"- Node.js package
const uri = "mongodb+srv://ariel:ariel123@cluster0.dcgiy.mongodb.net/ariel2?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


check= function(m)
{ 
   myobj=JSON.parse(m);
   MongoClient.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
   if (err) throw err;
   var dbo = db.db("ariel2");
   dbo.collection("test2").insertOne(myobj , function(err, res) {
     if (err) throw err; 
     console.log("1 document inserted");
   });
 });
}


