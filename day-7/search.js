"use strict";
const foods = [
    {
        id: 1,
        name: "Momo",
        price: 100
    },
    {
        id: 2,
        name: "Briyani",
        price: 100
    },
    {
        id: 3,
        name: "Dosa",
        price: 70
    },
    {
        id: 4,
        name: "Maggi",
        price: 30
    },
    {
        id: 5,
        name: "Idli",
        price: 50
    },
    {
        id: 6,
        name: "Fish",
        price: 200
    },
    {
        id: 7,
        name: "Chicken",
        price: 250
    },
    {
        id: 8,
        name: "Mutton",
        price: 400
    },
    {
        id: 9,
        name: "Egg",
        price: 50
    },
    {
        id: 10,
        name: "Uppam",
        price: 120
    },
    {
        id: 11,
        name: "Pizza",
        price: 150
    },
];
const search_term = 'p';
const filtered_items = foods.filter((food) => {
    return food.name.toLowerCase().includes(search_term.toLowerCase());
});
console.log(filtered_items);
