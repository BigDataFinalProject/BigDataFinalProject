var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var redis = require('redis');
var redisClient = redis.createClient();
var sub = redis.createClient()


var server = require('http').createServer(app);
const io = require("socket.io")(server)
const port = 8000



redisClient.subscribe('message'); 

app.get('/', (req, res) => res.send('Hello World!'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var var1,var2,var3,var4,var5,var6;

redisClient.on("message", function (channel, data) {
    var data = JSON.parse(data);
    console.log(data);
    current_section = data["current_section"];
    console.log(current_section)

    //26/7
    const Current_section={
        "section":current_section
    };
  
    // const fs = require('fs');
    // const to_json= JSON.stringify(Current_section);
      
    //     // write JSON string to a file
    //     fs.writeFile('./data/section.json', to_json, (err) => {
    //         if (err) {
    //             throw err;
    //         }
    //         console.log("JSON data is saved.");
    //     });
    //  console.log("after json")  
     
     //////////////////////////////////// 27/7
    const fs2 = require('fs');
    var save2;

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
        console.log("vars="+var1+","+var2+","+var3+","+var4+","+var5+","+var6)
        console.log(current_section+"current_section")
        switch (parseInt(current_section)) {
            case 1:var1++;break;
            case 2:var2++;break;
            case 3:var3++;break;
            case 4:var4++;break;
            case 5:var5++;break;
            case 6:var6++;break;
            default: break;
              
          }
        console.log("vars="+var1+","+var2+","+var3+","+var4+","+var5+","+var6)
        const fs3 = require('fs');
        const cars = {
            "one": var1,
            "two": var2,
            "three": var3,
            "four": var4,
            "five": var5,
            "six": var6
        };
        const data3 = JSON.stringify(cars);
        fs3.writeFile('./data/Cars_Sections.json', data3, (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.");
            // try to activate ejs without pressing !!!!!!!!!!
        });

      });

});



redisClient.on('connect', function() {
    console.log('Reciver connected to Redis');
});


server.listen(6061, function() {
    console.log('reciver is running on port 6061');
});

