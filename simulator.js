    types= ["Private_car","Bus","Motorcycle", "truck"]
    company= ["Kia", "Skoda", "Mercedes", "Renault", "Mitsubishi", "Tesla", "Toyota", "Honda", "Mazda", "Hyundai", "Suzuki"]
    years= ["2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021"]
    colors= ["Red", "purple", "white", "green", "yellow", "blue", "gray", "black", "silver", "gold"]
    sections=["1","2","3","4","5","6"]
    direction=["1","-1"]

    const days = {
      Sunday: 1,
      Monday: 2,
      Tuesday: 3,
      Wednesday: 4,
      Thursday: 5,
      Friday: 6,
      Saturday:7,
    }
    

class Car {
    constructor(number_id,type,day,hour,special_day,direction,Entrance_to_road,Entrance_section,current_section,Exit_from_section,Exit_from_road) {
      this.number_id = number_id;
      this.type = type;
      this.Entrance_section = Entrance_section;
      this.Exit_from_section=Exit_from_section;
      this.Entrance_to_road=Entrance_to_road;
      this.Exit_from_road=Exit_from_road;
      this.day=day;
      this.hour=hour;
      this.special_day=special_day;
      this.current_section=current_section;
      this.direction=direction;
      this.my_prediction=-1;
    }
  }

function beginSim () {
    Car=new Car(90,types[0],days.Sunday,"6:00",0,1,1,1,1,6,6);
    const kafka = require('./kafkaProduce');
    t=JSON.parse("{\"name\":\"car1\", \"insert\":\"1\",\"out\":\"6\",\"color\":\"red\"}");
    console.log(t)
    setTimeout(() => { kafka.publish(t) }, 2000);
   
   
}  


beginSim()
