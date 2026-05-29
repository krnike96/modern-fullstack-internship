const Users = [
    {
        id: 1,
        firstName: "Niket",
        age: 22,
        phone: 98867676757,
        email: "niket@niket.com",
    },
    {
        id: 2,
        firstName: "Andi",
        age: 20,
        phone: 98867676757,
        email: "andi@andi.com",
    },
    {
        id: 3,
        firstName: "Tom",
        age: 4,
        phone: 98867676757,
        email: "tom@tom.com",
    },
    {
        id: 4,
        firstName: "Caesar",
        age:4,
        phone: 98867676757,
        email: "caesar@caesar.com",
    },
    {
        id: 5,
        firstName: "Jerry",
        age: 3,
        phone: 98867676757,
        email: "jerry@jerry.com",
    }
];

Users.map((user) => {
    console.log(`${user.firstName}'s ID\t: ${user.id}`);
});

const newUsers = Users.map((user) =>{
    return {
        ...user,
        canVote: user.age >= 18
    };
});

console.log("----------Updated Users---------");
console.log(newUsers);
