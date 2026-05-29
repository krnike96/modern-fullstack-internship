async function add(a, b){
    const output = a + b;
    return output;
}

const output = add(2, 3);
console.log(output);

async function multiply(a, b){
    try{
        const output = await (a * b);
        return output;
    }catch(e){
        console.log(e);
    }
}

const output1 = multiply(2,3);
console.log(output1);

async function returnPromise(){
    const p = await new Promise((resolve, reject) => {
        resolve("Promise Resolved.");
    })
}

const p1 = returnPromise();
console.log(p1);

