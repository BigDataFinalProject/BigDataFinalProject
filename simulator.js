//const { setLevels } = require("bigml/lib/logger")
const kafka = require('./kafka/kafkaProduce');
const kafka2 = require('./batchPrediction');
const { setLevels } = require('bigml/lib/logger');

  types= ["Private_car","Bus", "truck"]
  company= ["Kia", "Skoda", "Mercedes", "Renault", "Mitsubishi", "Tesla", "Toyota", "Honda", "Mazda", "Hyundai", "Suzuki"]
  years= ["2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021"]
  sections=["1","2","3","4","5","6"]
  const direction = ["1","-1"]
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]  
  hours=["13:00","14:00","15:00","16:00","17:00"]


class Car {
    constructor(number_id,type,day,hour,special_day,direction,Entrance_to_road,current_section,my_prediction,Exit_from_road) {
      this.number_id = number_id;
      this.type = type;
      this.day=day;
      this.hour=hour;
      this.special_day=special_day;
      this.current_section=current_section;
      this.direction=direction;
      this.my_prediction=my_prediction;
      this.Entrance_to_road=Entrance_to_road;
      this.Exit_from_road=Exit_from_road;

    }
  }



function make_private_car (percent,id) {
  private=new Car(id,types[0],0,0,0,0,0,0,-2,0);
  if(percent>45){
    private.hour=hours[0];
    Math.floor(Math.random() * 2)+1 == 1? private.day=days[0] : private.day=days[4] ;
    private.Entrance_to_road=3;
    private.current_section=3
    private.direction=direction[0]
    Math.floor(Math.random() * 2)+1 == 1? private.Exit_from_road=4 : private.Exit_from_road=5;    
  }
 else{
  private.hour=hours[Math.floor(Math.random() * 5)]
  private.day=days[Math. floor(Math.random() * (3)) + 1]  //not Sunday & Thursday
  private.Entrance_to_road=5;
  private.current_section=5
  private.direction=direction[1]
  Math.floor(Math.random() * 2)+1 == 1? private.Exit_from_road=3 : private.Exit_from_road=2;    
 }
 see('key1',private);  //prediction+kafka

}

function make_Bus (percent,id) {
  Bus=new Car(id,types[1],0,0,0,0,0,0,-2,0);
  if(percent>40){
    Math.floor(Math.random() * 2)+1 == 1? Bus.hour=hours[0] : Bus.hour=hours[1] ;
    Math.floor(Math.random() * 2)+1 == 1? Bus.day=days[0] : Bus.day=days[1] ;
    Bus.Entrance_to_road=3;
    Bus.current_section=3
    Bus.direction=direction[1]
    Math.floor(Math.random() * 2)+1 == 1? Bus.Exit_from_road=1 : Bus.Exit_from_road=2;    
}
else{
  Bus.hour=hours[Math.floor(Math.random() * 3)+2]
  Bus.day=days[Math. floor(Math.random() * (5)) + 2]  //not Sunday & Thursday
  Bus.Entrance_to_road=1;
  Bus.current_section=1
  Bus.direction=direction[0]
  Math.floor(Math.random() * 2)+1 == 1? Bus.Exit_from_road=4 : Bus.Exit_from_road=5;    
}

 
 see('key1',Bus);


}
function make_Truck (percent,id) {
  truck=new Car(id,types[2],0,0,0,0,0,0,0,0,-2,0);
  if(percent>30){
      truck.hour=hours[4]
      Math.floor(Math.random() * 2)+1 == 1? truck.day=days[0] : truck.day=days[6] ;
      truck.Entrance_to_road=1;
      truck.current_section=1 
      truck.direction=direction[0]
      Math.floor(Math.random() * 2)+1 == 1? truck.Exit_from_road=5 : truck.Exit_from_road=6;    
  }
  else{
    truck.hour=hours[Math.floor(Math.random() * 4)]
    truck.day=days[Math. floor(Math. random() * (5)) + 1]  //not Sunday & Thursday
    truck.Entrance_to_road=6;
    truck.current_section=6
    truck.direction=direction[1]
    Math.floor(Math.random() * 2)+1 == 1? truck.Exit_from_road=1 : truck.Exit_from_road=2;    
  }

  
  see('key1',truck)

}


function beginSim () {
  for(let i=0;i<50;i=i+3){
  percent=Math.floor(Math.random() * 100)+1;
  id=Math.floor(Math.random() * 10000)+i;
  setTimeout(() => { make_private_car (percent,i)}, 8000);
  setTimeout(() => { make_Bus (percent,i+1)}, 8000);
  setTimeout(() => { make_Truck (percent,i+2)}, 8000);
 }
 const update_info = require('./redis/Info_Redis_Update');


}

const receive = require('./redis/RedisForArielReciver');
beginSim()
