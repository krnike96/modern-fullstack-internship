/*
    print numbers from 1 to 5
    1 after 1 sec,
    2 after 2 sec,
    and so on;
*/


for(let i = 1; i <= 5; i++){
    setTimeout(() => {
        console.log(`${i} after ${i} sec`);
    }, i * 1000);
}