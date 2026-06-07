"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);

  async function fetchData() {
    try {
      const res = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query GetTodos {
              getTodos {
                id
                todo
                completed
                user {
                  firstName
                  lastName
                }
              }
            }
          `,
        }),
      });

      const data = await res.json();
      console.log("Data: ", data);

      if (data.errors) {
        console.error("GraphQL Errors:", data.errors);
      } else {
        setTodos(data.data?.getTodos || []);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Todo Items:</h1>

      {todos.map((todo: any) => (
        <div key={todo.id}>
          <h3>{todo.todo}</h3>
          <h3>Completed: {todo.completed ? "True" : "False"}</h3>
          <h3>User:</h3>
          <h5>FirstName : {todo.user?.firstName}</h5>
          <h5>LastName : {todo.user?.lastName}</h5>
          <hr />
        </div>
      ))}
    </>
  );
}