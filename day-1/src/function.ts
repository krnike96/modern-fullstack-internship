function add(a: number, b: number): number {
    return a + b;
}
const output: number = add(5, 9);
console.log("output: ", output);

let balance: number = 5000;
const depositMoney = (amt: number) => { balance += amt; };
depositMoney(3333);
console.log("Balance: ", balance);

const withDrawMoney = function (amt: number) {
    balance -= amt;
};
withDrawMoney(3333);
console.log("withdraw: ", 3333);
console.log("Remaining balance: ", balance);

// template string
const firstName = "Niket";
const lastName = "Kumar";
console.log(`${firstName} ${lastName}`);

// Object
const obj0 = {
    name: "Niket",
    id: 1,
};
console.log(obj0);

const student1 = {
    name: "Niket",
    age: 22,
    marks: [50, 60, 70],
    isPassed: true,
};
console.log(student1);

// Type Alias
type student = {
    name: string,
    age: number,
    marks: number[],
    isPassed?: boolean
};

const student2: student = {
    name: "Andi",
    age: 20,
    marks: [50, 60, 90, 90],
    isPassed: true
};
console.log(student2);

interface Employee{
    name: string,
    department: string, 
    employeeId: number,
    isPromoted: boolean,
    salary: number
};

const emp1: Employee = {
    name: "Tom",
    department: "Health & Insurance",
    employeeId: 1,
    isPromoted: true,
    salary: 5000
};
console.log("Employee - 1 Details: ",emp1);

interface Car{
    model: string,
    brand: string,
    milage: number,
    speed: number,
    fuelType: string,
    seat: number,
    price: number
    year: number
};

const car1: Car = {
    model: "Lamborgini M2",
    brand: "Lamborgini",
    milage: 30,
    speed: 400,
    fuelType: "Petrol",
    seat: 3,
    price: 10000000,
    year: 2020
};
console.log("Car1 Details: ", car1);