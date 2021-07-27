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


redisClient.on("message", function (channel, data) {
    var data = JSON.parse(data);
    console.log(data);
    current_section = data["current_section"];
    console.log(current_section)

    //26/7
    const Current_section={
        "section":current_section
    };
  
   
    const fs = require('fs');
    const to_json= JSON.stringify(Current_section);
        
        // write JSON string to a file
        fs.writeFile('./data/section.json', to_json, (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.");
        });
});

redisClient.on('connect', function() {
    console.log('Reciver connected to Redis');
});


server.listen(6061, function() {
    console.log('reciver is running on port 6061');
});

