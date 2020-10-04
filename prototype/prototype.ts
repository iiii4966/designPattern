const log = console.log;

var carObject = {
    drive(){
        console.log("Started Driving")
        },
    brake(){
        console.log("Stopping the carObject")
    },
    numofWheels : 4  
} 

// Object 
const car1 = Object.create(carObject);
car1.drive(); // Started Driving            
car1.brake(); // Stopping the carObject
console.log(car1.numofWheels); // 4

const car2 = Object.create(carObject)
car2.drive(); // Started Driving
car2.brake(); // Stopping the carObject
console.log(car2.numofWheels); // 4


// Class 
class CarObject {
     constructor(public numOfWheels: number){}
     drive(){log("started Driving")}
     brake(){log("stoped Driving")}
}
const carObj = new CarObject(4) // CarObject {}
const car3 = Object.create(carObj) // CarObject {}
const car4 = Object.create(carObj) // CarObject {}
// log(car3.numOfWheels) // 4

carObj.numOfWheels = 1 // origin object set
log(car3.numOfWheels) // 1; changed
log(car4.numOfWheels) // 1; changed

log(carObj, car3) // CarObject { numOfWheels: 1 } CarObject {}
log(car3.__proto__) // CarObject { numOfWheels: 1 }

/**
 * Object.create 로 객체 복제시 하위 객체에 속성을 전달하지 않는다.
 * 다만 복제된 객체의 __proto__ 속성으로 프로토타입 객체를 접근하는 것이 가능해진다.
 * 따라서 하위 객체의 속성을 변경하는 것은 setter로 동작하는 것이고, 프로토타입 객체의 속성을 변경하지 않는다.
 */

car3.numOfWheels = 2 // cloned object set
log(car3.numOfWheels) // 2; changed
log(car4.numOfWheels) // 1; not changed
log(carObj.numOfWheels) // 1; not changed

log(carObj, car3) // CarObject { numOfWheels: 1 } CarObject { numOfWheels: 2 }

carObj.numOfWheels = 4 // origin object reset 
log(car3.numOfWheels) // 2; not changed
log(car4.numOfWheels) // 4; changed
log(carObj.numOfWheels) // 4; reset

// 한번 변경되면 다시 기존 프로토타입 객체의 영항을 받지 않는다!?

car4.numOfWheels = 1
carObj.numOfWheels = 2
log(car4.numOfWheels) // 1; not changed; 영향을 받지 않음