var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var redis = require('redis');
var redisClient = redis.createClient();
var sub = redis.createClient()
var save_section;

update_file_sections=function(last_section,next_section){
    console.log("in")
    const fs2 = require('fs');
    var save2;
    fs2.readFile('./data/Cars_Sections.json', 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }
        save2=JSON.parse(data.toString()); 
        var1=parseInt(save2.one);var2=parseInt(save2.two);var3=parseInt(save2.three);var4=parseInt(save2.four);var5=parseInt(save2.five);var6=parseInt(save2.six);
        console.log(var1+","+var2+","+var3+","+var4+","+var5+","+var6)

        switch (parseInt(next_section)) {
            case 1:var1++;break;
            case 2:var2++;break;
            case 3:var3++;break;
            case 4:var4++;break;
            case 5:var5++;break;
            case 6:var6++;break;
            default: break;
              
          }
          switch (parseInt(last_section)) {
            case 1:var1--;break;
            case 2:var2--;break;
            case 3:var3--;break;
            case 4:var4--;break;
            case 5:var5--;break;
            case 6:var6--;break;
            default: break;
              
          }
          console.log(var1+","+var2+","+var3+","+var4+","+var5+","+var6)
        const fs3 = require('fs');
        const cars = {"one": var1,"two": var2,"three": var3,"four": var4,"five": var5,"six": var6 };
        const data3 = JSON.stringify(cars);
        fs3.writeFile('./data/Cars_Sections.json', data3, (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.");
            // try to activate ejs without pressing !!!!!!!!!!
        });

      });

}

update= function(){
  var async = require("async");
  redisClient.keys('*', function (err, keys) {
    console.log("update")
    if (err) return console.log(err);
    if(keys){
        async.map(keys, function(key, cb) {
            redisClient.get(key, function (error, value) {
                if (error) return cb(error);
                var job = {};
                job['Id_car']=key;
                job['data']=value;
                cb(null, job);
            }); 
        }, function (error, results) {
           if (error) return console.log(error);
           console.log(results);
               for(let i=0; i<results.length;i++){
               console.log(results[i].Id_car)
               car=JSON.parse(results[i].data)
               save_section=car.current_section;
               if(car.direction==-1) car.current_section--;
               else car.current_section++;
               redisClient.set(results[i].Id_car, JSON.stringify(car))
               console.log(car)
               if(car.current_section>6 || car.current_section<1){
                redisClient.del(results[i].Id_car)
               }
               update_file_sections(save_section,car.current_section);
               console.log(save_section,car.current_section)
               const fs3 = require('fs');
               const data3 = JSON.stringify(results);
               console.log("data3"+data3)
               fs3.writeFile('./data/car_details.json', data3, (err) => {
                  if (err) {
                    throw err;
                }
               console.log("JSON data is saved.");
         });
            
           }
           
        });
    }
});
}


update();
     

    