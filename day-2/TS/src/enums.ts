enum Role{
    ADMIN = "ADMIN",
    USER = "USER"
}
interface User{
    id: number,
    name: string,
    role: Role,
    email: string,
    isValid: boolean
};

const users: User[] = [
{
    id: 1,
    name: "Niket",
    role: Role.ADMIN,
    email: "niket@niket.com",
    isValid: true
},{
    id: 2,
    name: "Tom",
    role: Role.USER,
    email: "tom@tom.com",
    isValid: true
},
{
    id: 3,
    name: "Caesar",
    role: Role.USER,
    email: "caesar@caesar.com",
    isValid: false
}
];

function showUsers(){
    console.log("----------------Users--------------");
    users.forEach((user) => {
        console.log(`userID\t\t: ${user.id}`);
        console.log(`userName\t: ${user.name}`);
        console.log(`userRole\t: ${user.role}`);
        console.log(`userEmail\t: ${user.email}`);
        console.log(`userExists\t: ${user.isValid}`);
        console.log("-------------------------------------")
    });
};

function login(user: User): void{
    console.log(`${user.name} has logged in successfully.`);

    if(user.role === "ADMIN"){
        console.log(`${user.name} has granted ${user.role} rights.`);
        console.log(`${user.name} can manage user permissions and other settings.`);
    }else{
        console.log(`${user.name} has ${user.role} rights only.`);
    }
}

const user1 = users[0];
if(user1){
    login(user1);
}
showUsers();