const promise = new Promise((resolve, reject) => {
    // resolve("Promise resolved!");
    reject("Promise rejected!");
    // console.log("This is inside promise");
    
});

// console.log(promise);

promise.then(() => {
    console.log("Promise Handled");
}).catch((e) => {
    console.error(e.message);
})


// function returning a promise
function returnPromise(){
    return new Promise((resolve, reject) => {
        // resolve("This promise is resolved.");
        reject("This promise is rejected.");
    });
}

const p = returnPromise();
p.then(() => {
    console.log("It is fulfulled");
}).catch((e) => {
    console.log(e);
})
console.log(p);
