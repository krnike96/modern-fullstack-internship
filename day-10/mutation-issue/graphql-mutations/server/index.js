import express from 'express';
import cors from 'cors';
import {expressMiddleware} from '@as-integrations/express5';
import { ApolloServer } from '@apollo/server';

const PORT = 8000;
// app.use() - you are using middleware
async function startServer(){
    const app = express();
    
    const server = new ApolloServer({
        typeDefs: `#gql

            type User{
                id: ID!
                firstName: String!
                lastName: String!
                email: String!
            }
            
            type Todo{
                id: ID!
                todo: String!
                completed: Boolean!
                user: User
            }
            
            type Query{
                getTodos: [Todo]
            }
        
        `,
        resolvers:{
            Query: {
                getTodos: async () => {
                    const response = await fetch("https://dummyjson.com/todos");
                    const data = await response.json();
                    // console.log("todo:", data);
                    return data.todos;
                }
            },

            Todo: {
                user: async (parent) => {
                    // console.log("parent: ", parent); // current Todo object
                    const response = await fetch(`https://dummyjson.com/users/${parent.id}`);
                    const data = await response.json();
                    return data;
                }
            }

        }
    });
    await server.start();
    // app.use(cors());
    app.use(express.json());
    app.use("/graphql", cors(), expressMiddleware(server));

    app.listen(PORT, () => {
        console.log(`Server started at ${PORT}`);
    })
}

startServer();