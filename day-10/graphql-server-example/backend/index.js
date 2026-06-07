import express from "express";
import cors from "cors";
import { expressMiddleware } from "@as-integrations/express5";
import { ApolloServer } from "@apollo/server";

const PORT = 4000;

async function startServer() {
  const app = express();

  const typeDefs = `
    type User {
      id: ID!
      firstName: String!
      lastName: String!
    }

    type Todo {
      id: ID!
      todo: String!
      completed: Boolean!
      userId: ID!
      user: User
    }

    type Query {
      getTodos: [Todo]
    }
  `;

  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Query: {
        getTodos: async () => {
          const res = await fetch("https://dummyjson.com/todos");
          const data = await res.json();
          return data.todos;
        }
      },
      Todo: {
        user: async (parent) => {
          const res = await fetch(`https://dummyjson.com/users/${parent.userId}`);
          const user = await res.json();
          return user;
        }
      }
    }
  });

  await server.start();

  app.use(cors());
  app.use(express.json());
  app.use("/graphql", expressMiddleware(server));

  app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
  });
}

startServer().catch(console.error);