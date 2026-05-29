// Intersection means add or combine more than one

type Person = {
    name: string,
    age: number
};

type Employee = {
    salary: number,
    employeeId?: number //Optional: ?
};

type staff = Person & Employee;
const worker1: staff ={
    name: "Caesar",
    age: 4,
    salary: 0.00,
    employeeId: 2
};
console.log("Worker1 Details: ",worker1);