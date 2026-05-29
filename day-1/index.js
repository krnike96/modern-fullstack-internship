// Multiply Functions

//Function using function keyword
function multiply1(a,b){
    console.log(a * b);
};

multiply1(2,3);

//Function Expression
const multiply2 = function(a,b){
    console.log(a*b);
}

multiply2(3,4);

//Arrow function
const multiply3 = (a,b) => {
    console.log(a*b);
}

multiply3(4,5);

// //Anonymous funtion
// function(a,b){
//     console.log(a*b);
// };

const student = {
    name : "Niket",
    age: 22,
    branch : "CSE",
    hasGraduated: false,
    address : {
        city: "Coimbatore",
        Street: "Kondampatty",
        district: "Coimbatore",
        State: "Tamil Nadu"
    } 
};

console.log(student);

