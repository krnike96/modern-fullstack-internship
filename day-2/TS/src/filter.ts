const nums = [1,2,3,4,5,6,7,8,9,10];

const evenNums = nums.filter((num) => !(num & 1));
console.log(evenNums);

const arr = [
    {
        name: "Niket",
        age: 22,
    },
    {
        name: "Andi",
        age: 20,
    },
    {
        name: "Tom",
        age: 4,
    },
    {
        name: "Caesar",
        age: 4,
    },
    {
        name: "Jerry",
        age: 3,
    },
];

const updatedArr = arr.filter((elem) => elem.age >= 18);
console.log(updatedArr);

