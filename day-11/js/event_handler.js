console.log("Start");

setTimeout(() => {
    console.log("inside timer");
}, 5000);

const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
    alert("button is clicked");
});



new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(`Promise resolved after ${timer} ms`);
    }, timer);
});


const p = returnPromise();
console.log(p);

console.log("Stop");

/*
    start 
    end
    hello from promise
    fetch user
    timer
    eventListener
*/