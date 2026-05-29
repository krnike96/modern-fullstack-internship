// define the datatype of the variable explicitly
let num: number = 50;
let floatNum: number = 50.12;
let name: string = "Niket";
let isFalse: boolean = false;
let arr0: number[] = [1,2,3,4,5];

console.log(num);
console.log(floatNum);
console.log(name);
console.log(isFalse);
console.log(arr0);

arr0.push(6);
console.log(arr0);

let arr1: string[] = ["Coimbatore", "Chennai", "Bengaluru", "Mysore"];
console.log(arr1);

let arr2: readonly boolean[] = [true, false, false, true];
// arr2.push(false);
console.log(arr2[2], arr2);

let arr3: number[][] = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];
console.log("Matrix: ", arr3);

//type: any
let anyVar: any = 10;
anyVar = "it is string now";
console.log("anyVar:",anyVar);
anyVar = [1,2,3];
console.log("anyVar: ",anyVar);
anyVar = false;
console.log("anyVar",anyVar);
anyVar = [1, false, "string", 10.4, [4,5,6], {a: 5, b:10}];
console.log("anyVar: ", anyVar);