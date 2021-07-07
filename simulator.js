class Car {
    constructor(number_id,type,Entrance_section,Exit_from_section,Entrance_to_road,Exit_from_road,day,hour,special_day) {
      this.number_id = number_id;
      this.type = type;
      this.Entrance_section = Entrance_section;
      this.Exit_from_section=Exit_from_section;
      this.Entrance_to_road=Entrance_to_road;
      this.Exit_from_road=Exit_from_road;
      this.day=day;
      this.hour=hour;
      this.special_day=special_day;
    }
  }


function beginSim () {
    types= ["Private_car","Bus","Motorcycle", "truck"]
    company= ["Kia", "Skoda", "Mercedes", "Renault", "Mitsubishi", "Tesla", "Toyota", "Honda", "Mazda", "Hyundai", "Suzuki"]
    years= ["2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021"]
    colors= ["Red", "purple", "white", "green", "yellow", "blue", "gray", "black", "silver", "gold"]


    for (let i=0;i<50;i++){
     
      Entrance_to_road=Math.floor(Math.random()*6)+1;
      if(i%2==0){
        Exit_from_road=Math.floor(Math.random()*6)+Entrance_to_road;
      }
      else{
        Exit_from_road=Math.floor(Math.random()*Entrance_to_road)+1; 
      }
      
      const Car =new Car(Entrance_to_road,Exit_from_road);
      
    }
}  



Entrance_section=Math.floor(Math.random()*6)+1;
if(i%2==0){
   Exit_from_section=Math.floor(Math.random()*6)+Entrance_section;
}
else{
   Exit_from_section=Math.floor(Math.random()*Entrance_section)+1; 
}

if __name__ == '__main__':
    beginSim()
