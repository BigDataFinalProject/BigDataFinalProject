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


    
app.get('/dashboard', function routeHandler(req ,res) {
var var1,var2,var3,var4,var5,var6;
const fs2 = require('fs');
fs2.readFile('./data/Cars_Sections.json', 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }
        save2=JSON.parse(data.toString()); 
        var1=parseInt(save2.one);var2=parseInt(save2.two);var3=parseInt(save2.three);
        var4=parseInt(save2.four);var5=parseInt(save2.five);var6=parseInt(save2.six);
        const fs3 = require('fs');
        fs3.readFile('./data/car_details.json', 'utf-8', (err, data2) => {
             if (err) {
                throw err;
        }
        res.render('dashboard',{one:var1,two:var2,three:var3,four:var4,five:var5,six:var6,json:data2.toString()} );

        });

});


    
});

app.get('/p', function routeHandler(req ,res) {
    const fs2 = require('fs');
    fs2.readFile('./data/dashboard_table.json', 'utf-8', (err, data) => {
            if (err) {
                throw err;
            }
            save2=JSON.parse(data.toString());
            sum=0;
            sum_positive=0;
            for(let i=0;i<save2.array.length;i++){
                if(save2.array[i]!=0){
                    sum=sum+save2.array[i];
                }
                if(i%7==0){
                    if(save2.array[i]!=0)
                       sum_positive=sum_positive+save2.array[i];
                }
            }
            acur=  parseInt(sum_positive/sum*100);
            res.render('prediction',{array:save2.array,acur:acur} );
    
            });
    
    });



//------------ Mongo_csv------------
const mongocsv = require('./Mongo_csv');
const bigml = require('./BigMl');
const { data } = require('bigml/lib/logger');



//------------ Socket.io ----------------
io.on("connection", (socket) => {
    console.log("new user connected");
    socket.on("totalWaitingCalls", (msg) => { console.log(msg.totalWaiting) });
    socket.on("callDetails", (msg) => { kafka.publish(msg) });
    socket.on("Outcsv", () => { 
        mongocsv.publish()
        bigml.publish()});

});









//------------------- kafka -----------
/* Kafka Producer Configuration */

//
//const client1 = new kafka.KafkaClient({kafkaHost: "localhost:9092"});






//------------------------------------


server.listen(port, () => console.log(`Ariel app listening at http://localhost:${port}`));


