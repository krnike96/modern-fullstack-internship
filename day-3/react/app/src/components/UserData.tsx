/*
    call dummmyjson api using fetch
    store the api data in state variable using useState
    users, setUsers
    loading, setLoading - to display the loading message
    error, setError - if any error occurs, handle it
    display all the users
*/

import { useState, useEffect } from "react"

interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string
};

function UserData() {
    const [users, setUser] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);

    function getUsersData() {
        fetch("https://dummyjson.com/users")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setUser(data.users);
                setIsLoading(!isLoading);
            })
            .catch((e) => {
                setError(e);
            });
    }

    useEffect(() => {
        getUsersData();
    }, []);

    if(isLoading){
        return (
            <h1>Data is Loading...</h1>
        );
    }

    if(error){
        return (
            <h1>Error while fetching the data</h1>
        );
    }
    return (
        <div>
            <h1>Users Data</h1>
            {
                users.map((user) => (
                    <div key={user.id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
                        <h2>{user.firstName}</h2>
                        <h2>{user.lastName}</h2>
                        <h2>{user.email}</h2>
                    </div>
                )
                )
            }
        </div>
    )
}

export default UserData
