"use client"
import {useState, useEffect} from 'react';

interface User{
    id: number,
    firstName: string
}
function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    async function getAllUsers(){
        const res = await fetch("https://dummyjson.com/users");
        const data = await res.json();
        setUsers(data.users);
    }

    useEffect(() => {
        getAllUsers();
    }, []);
  return (
    <div>
      <h1>Users Page</h1>
      {
        users.map((user) => (
            <div key={user.id}>
                {user.firstName}
            </div>
        ))
      }
    </div>
  )
}

export default UsersPage;
