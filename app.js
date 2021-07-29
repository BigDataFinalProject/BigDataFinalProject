const express = require('express');
const app = express();
var server = require('http').createServer(app);
const io = require("socket.io")(server)
const port = 3000


//------------ kafka------------
const kafka = require('./kafkaProduce');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//------------

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/', (req, res) => res.send("<a href='/send'>Send</a> <br/><a href=''>View</a>"));
app.get('/send', (req, res) => res.render('sender'));



// //  read from Cars_section and send info to dashboard -27/7
// update=function(){
// var var1,var2,var3,var4,var5,var6;
// const fs2 = require('fs');
// fs2.readFile('./data/Cars_Sections.json', 'utf-8', (err, data) => {
//         if (err) {
//             throw err;
//         }
//         console.log("data2"+data)
//         save2=JSON.parse(data.toString()); 
//         console.log("save2"+save2.one.toString())
//         var1=parseInt(save2.one);
//         var2=parseInt(save2.two);
//         var3=parseInt(save2.three);
//         var4=parseInt(save2.four);
//         var5=parseInt(save2.five);
//         var6=parseInt(save2.six);
// });
// }
    
app.get('/dashboard', function routeHandler(req ,res) {
var var1,var2,var3,var4,var5,var6;
const fs2 = require('fs');
fs2.readFile('./data/Cars_Sections.json', 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }
        console.log("data2"+data)
        save2=JSON.parse(data.toString()); 
        console.log("save2"+save2.one.toString())
        var1=parseInt(save2.one);
        var2=parseInt(save2.two);
        var3=parseInt(save2.three);
        var4=parseInt(save2.four);
        var5=parseInt(save2.five);
        var6=parseInt(save2.six);
        console.log(var1+","+var2)
        //res.render('dashboard',{one:var1,two:var2,three:var3,four:var4,five:var5,six:var6} );
        const fs3 = require('fs');
        fs3.readFile('./data/car_details.json', 'utf-8', (err, data2) => {
             if (err) {
                throw err;
        }
        // save_json=JSON.parse(data2.toString()); 
        // console.log("data2.toString()=="+data2.toString())
        // console.log("save+json"+save_json.toString())
     
        res.render('dashboard',{one:var1,two:var2,three:var3,four:var4,five:var5,six:var6,json:data2.toString()} );

        });

});


    
});


//11/7- prediction table
app.get('/p', (req, res) => res.render('prediction'));


//------------ Mongo_csv------------
const mongocsv = require('./Mongo_csv');
const bigml = require('./BigMl');
const { data } = require('bigml/lib/logger');



//------------ Socket.io ----------------
io.on("connection", (socket) => {
    console.log("new user connected");
    socket.on("totalWaitingCalls", (msg) => { console.log(msg.totalWaiting) });
    socket.on("callDetails", (msg) => { console.log(msg);kafka.publish(msg) });
    socket.on("Outcsv", () => { 
        console.log("to csv need to activate mongocsv");
        mongocsv.publish()
        bigml.publish()});

});









//------------------- kafka -----------
/* Kafka Producer Configuration */

//
//const client1 = new kafka.KafkaClient({kafkaHost: "localhost:9092"});






//------------------------------------


server.listen(port, () => console.log(`Ariel app listening at http://localhost:${port}`));


