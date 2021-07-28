const enums = require("./Enums");
var EventObj = require("./Event");
const kafka = require('./kafkaProduce');
const kafkaSubs = require('./kafkaConsume');
class Simulator{
    // constructor(){
    //     let event = new EventObj.EventObj(1,'road_enter',3,4,5,6,7,8);
    //     console.log(event.toString());
    //     this.sendEvent(event);
    // }
    makeEvent(){
        // var dir, car_ty, sec;
        let ran_num_direction = Math.floor(Math.random() * 2) + 1;
        // for(var direc in enums.direction){
        //     ran_num_direction--;
        //     if(ran_num_direction < 0){
        //         dir=direc;
        //         break;
        //     }
        // }
        let ran_num_car_type = Math.floor(Math.random() * 3) + 1;
        // for(var type in enums.car_type){
        //     ran_num_car_type--;
        //     if(ran_num_car_type < 0){
        //         car_ty=type;
        //         break;
        //     }
        // }
        let ran_num_section = Math.floor(Math.random() * 5) + 1;
        // for(var sect in enums.sections){
        //     ran_num_section--;
        //     if(ran_num_section < 0){
        //         sec=sect;
        //         break;
        //     }
        // }
        let car_num = Math.floor(Math.random() * 100000);
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        // let event = new EventObj.EventObj(car_num, enums.event_type.ROAD_ENTER, sec, dir, enums.day.SUN, time, false);
        let event = new EventObj.EventObj(car_num, enums.event_types.ROAD_ENTER, ran_num_section, ran_num_direction, ran_num_car_type, this.day, time, this.is_special, ran_num_section);
        this.sendEvent(event.toString());
        setTimeout(() => { this.carRoute(event); }, 3000);
    }
    carRoute(event){
        // while(true){
            if(event.getSection() === enums.sections.FIVE && event.getDirection() === enums.directions.WEST)
                this.exit(event);
            
            else if(event.getSection() === enums.sections.ONE && event.getDirection() === enums.directions.EAST)
                this.exit(event);

            else if(event.getCarKind() === enums.car_types.TRUCK)
                this.truckWay(event);
            
            else if(event.getCarKind() === enums.car_types.PRIVATE)
                this.privateWay(event);
            
            else if(event.getCarKind() === enums.car_types.VAN)
                this.vanWay(event);

        // }
    }

    truckWay(event){
        let random_num =  Math.floor(Math.random() * 10) + 1;
        if(random_num > 1){
            this.nextSection(event);
            setTimeout(() => { this.carRoute(event); }, 3000);
        }
        else{
            this.exit(event);
        }
    }

    privateWay(event){
        let random_num =  Math.floor(Math.random() * 10) + 1;
        if(Math.abs(event.getSection - event.getFirstSection()) < 2){
            if(random_num > 1){
                this.nextSection(event);
                setTimeout(() => { this.carRoute(event); }, 3000);
            }
            else{
                this.exit(event);
            }
        }
        else{
            random_num =  Math.floor(Math.random() * 10) + 1;
            if(random_num <= 3){
                this.nextSection(event);
                setTimeout(() => { this.carRoute(event); }, 3000);
            }
            else{
                this.exit(event);
            }
        }
        
        
    }

    vanWay(event){
        let random_num =  Math.floor(Math.random() * 10) + 1;
        if(random_num > 3){
            this.nextSection(event);
            setTimeout(() => { this.carRoute(event); }, 3000);
        }
        else{
            this.exit(event);
        }
    }

    sendEvent(event_string){setTimeout(() => { kafka.publish(event_string); }, 400);}

    nextSection(event){
        event.setEventKind(enums.event_types.SECTION_EXIT);
        let today = new Date();
        event.setTime(today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
        this.sendEvent(event.toString());
        //If direction is west, the direction is from section one to five.
        let section = (event.getDirection() === enums.directions.WEST)? event.getSection() + 1 : event.getSection() - 1;
        event.setSection(section);
        event.setEventKind(enums.event_types.SECTION_ENTER);
        setTimeout(() => {this.sendEvent(event.toString());}, 100);
        // this.sendEvent(event.toString());
    }
    exit(event){
        event.setEventKind(enums.event_types.SECTION_EXIT);
        let today = new Date();
        event.setTime(today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
        this.sendEvent(event.toString());
        event.setEventKind(enums.event_types.ROAD_EXIT);
        setTimeout(() => {this.sendEvent(event.toString());}, 100);
        // this.sendEvent(event.toString());
    }

    run(){
        this.day = enums.days.SUN;
        this.is_special = false;
        setInterval(() => {
            this.day = ((this.day + 1) % 7);
            if(this.day === 0)
                this.day = enums.days.SAT; 
            if(Math.floor(Math.random()*10) === 0)
                this.is_special = true;
            else
                this.is_special = false;
        } , 100000);
        setInterval(() => {this.makeEvent();}, 10000); 
    }
}
// setTimeout(() => { kafka.publish(event.toString()); }, 300);
// for(var dir in enums.direction)
//     console.log(dir.toString());
    // setTimeout(() => { kafka.publish(" "); }, 500);
// new Simulator().makeEvent(1, false);
new Simulator().run();
// setInterval(() => {console.log(kafkaSubs.subscribe.toString());}, 3000);