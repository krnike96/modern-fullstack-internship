/*
    in clent side component, we are using useeffect and usesatte
    to store the data and request the data
    in server side component, we can still make a network request without using state or effect

    in SSR, secret keys such as API calls, password, etc are not exposed in the browser's network tab

    in CSR, all these details such as network calls, APIs, secret keys are exposed
*/

type User = {
  id: number,
  firstName: string
}
async function getAllUsers(): Promise<User[]>{
  const res = await fetch("https://dummyjson.com/users");
  const data = await res.json();
  return data.users;
}

async function UsersPage() {
  const users: User[] = await getAllUsers();

  return (
    <div>
      <h1>Server Page</h1>
      {
        users.map((user:User) => (
          <div key={user.id}>
            {user.firstName}
          </div>
        ))
      }
    </div>
  )
}

export default UsersPage;
