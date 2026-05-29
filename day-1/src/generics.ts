function generic<T>(value: T): T | void{
    console.log(value);
    return value;
}
generic<string>("Hello World!");

const num = generic<number>(10);
console.log(num);

