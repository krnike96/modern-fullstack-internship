export interface FOOD{
    id: number,
    name: string,
    price: number,
    category?: string
}
export const foods: FOOD[] = [
    {
        id: 1,
        name: "Momo",
        price: 100,
        category: "Non-Veg"
    },
    {
        id: 2,
        name: "Briyani",
        price: 100,
        category: "Non-Veg"
    },
    {
        id: 3,
        name: "Dosa",
        price: 70,
        category: "veg"
    },
    {
        id: 4,
        name: "Maggi",
        price: 30,
        category: "veg"
    },
    {
        id: 5,
        name: "Idli",
        price: 50,
        category: "Veg"
    },
    {
        id: 6,
        name: "Fish",
        price: 200,
        category: "Non-Veg"
    },
    {
        id: 7,
        name: "Chicken",
        price: 250,
        category: "Non-Veg"
    },
    {
        id: 8,
        name: "Mutton",
        price: 400,
        category: "Non-Veg"
    },
    {
        id: 9,
        name: "Egg",
        price: 50,
        category: "Non-Veg"
    },
    {
        id: 10,
        name: "Uppam",
        price: 120,
        category: "Veg"
    },
    {
        id: 11,
        name: "Pizza",
        price: 150,
        category: "Veg"
    },
];