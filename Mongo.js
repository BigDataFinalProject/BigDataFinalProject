
const { MongoClient } = require('mongodb'); //we made "npm install mongodb"- Node.js package
const uri = "mongodb+srv://ariel:ariel123@cluster0.dcgiy.mongodb.net/ariel2?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var myobj = {"name":"car1", "insert":"1","out":"6","color":"red"};


//11/7- we added to the code- we are getting a message from kafkaConsume and inserting it to our mongodb
check= function(m)
{ 
  console.log("in checkkkk");
   console.log(m);
   console.log("type of m="+typeof m);
   myobj=JSON.parse(m);
   console.log("end");

   //supose to be the same as in the uri (ariel2)
MongoClient.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("ariel2");
  dbo.collection("test2").insertOne(myobj , function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    //db.close(); 11/7
  });
});
}
//11/7- we added to the code


