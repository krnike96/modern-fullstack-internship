function generic<T>(value: T): T | void{
    console.log(value);
    return value;
}
generic<string>("Hello World!");

const num = generic<number>(10);
console.log(num);

function printArr<T>(arr: T[]): T[] | T | undefined{
    return arr;
}

const arr0: number[] = [1,2,3,4,5];
console.log(printArr<number>(arr0));

const arr1: string[] = ["niket", "tom", "jerry"];
console.log(printArr<string>(arr1));
