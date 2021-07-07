
const { MongoClient } = require('mongodb'); //we made "npm install mongodb"- Node.js package
const uri = "mongodb+srv://ariel:ariel123@cluster0.dcgiy.mongodb.net/ariel2?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var myobj = { name: "Car1", insert: "1", out: "6" , color: "red", time: "7:00" };

//supose to be the same as in the uri (ariel2)
MongoClient.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("ariel2");
    dbo.collection("test2").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });