'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [todos, setTodos] = useState([]);

  async function getTodos() {
    const response = await fetch('http://localhost:8000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            getTodos {
              id
              todo
              completed
              user {
                id
                firstName
                lastName
                email
              }
            }
          }
        `,
      }),
    });

    const data = await response.json();
    setTodos(data.data.getTodos);
    //console.log("todos:", data.data.getTodos);
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      {
        todos.map((todo:any) => (
          <div key={todo.id}>
            <h3>ID: {todo.id}</h3>
            <h3>Todo: {todo.todo}</h3>
            <h2>FirstName: {todo.user.firstName}</h2>
            <h2>LastName: {todo.user.lastName}</h2>
            <h2>Email : {todo.user.email}</h2>

            <hr />
          </div>
        ))
      }
    </div>
  );
}