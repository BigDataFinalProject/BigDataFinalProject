var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var redis = require('redis');
var redisClient = redis.createClient();
var sub = redis.createClient()

var async = require("async");


// for explanations : https://www.sitepoint.com/using-redis-node-js/

app.get('/test', function (req, res) {

    // Store string  
    redisClient.set('NumberOfCars', "390", function (err, reply) {
        console.log(reply);
    });

    //Store and get Hash i.e. object( as keyvalue pairs)
    redisClient.hmset('Sections',"one", 'Sorek',"two", 'Nesharim',"three", 'BenShemen', "four",'nashonim',"five", 'kesem');
    redisClient.hgetall('Sections', function (err, object) {
        console.log(object);
    });
   
   var see="{\"name\":\"car1\",\"color\":\"red\"}";
    redisClient.publish("message", see, function () {
    });

    res.send('תקשרתי עם רדיס....')
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

sendredis= function(m){   //13/7- message from kafka (this function we activated from kafkaconsume code)
    // we still need to take only part of message to redis.
    //make it a car, and then take stuff out
    console.log(m+"m");
    const myObj=JSON.parse(m)
    current_section = myObj["current_section"];
    Entrance_to_road = myObj["Entrance_to_road"];
    Exit_from_road = myObj["Exit_from_road"];
    number_id = myObj["number_id"];
    direction = myObj["direction"];

    const Redis = {
        "current_section": current_section,
        "Entrance_to_road": Entrance_to_road,
        "Exit_from_road": Exit_from_road,
        "direction": direction
       };

    redisClient.set(number_id.toString(), JSON.stringify(Redis));
    redisClient.publish("message", JSON.stringify(Redis), function () {
    });
    console.log("#######")


   

}
// sendredis("{\"number_id\":32,\"type\":\"truck\",\"day\":\"Sunday\",\"hour\":\"17:00\",\"special_day\":0,\"current_section\":1,\"direction\":\"1\",\"my_prediction\":0,\"Entrance_to_road\":1,\"Exit_from_road\":6}")
// sendredis("{\"number_id\":31,\"type\":\"truck\",\"day\":\"Sunday\",\"hour\":\"17:00\",\"special_day\":0,\"current_section\":6,\"direction\":\"-1\",\"my_prediction\":0,\"Entrance_to_road\":6,\"Exit_from_road\":1}")

//erase this row !!!!!!!!!!!!!!!!!-> 65

redisClient.on('connect', function () {
    console.log('Sender connected to Redis');
});
server.listen(6062, function () {
    console.log('Sender is running on port 6062');
});

