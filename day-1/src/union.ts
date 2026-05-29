// Assign Selected Types, better than type: any
let id: string | number;
id = "1";
console.log(`Id as String : ${id}`);
id = 2;
console.log(`Id as Number : ${id}`);

type httpStatus = "CREATED" | "NOT_FOUND" | "SERVER";
let status: httpStatus = "CREATED";

type t1 = string | number;
let var1: t1 = "string";
var1 = 5;
