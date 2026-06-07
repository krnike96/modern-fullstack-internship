import express from "express";
import cors from 'cors';
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

const PORT = 6000;

const users = [
    {
        id: 1,
        name: 'John',
        email: 'john@gmail.com',
        phone: '9451234560'
    },
    {
        id: 2,
        name: 'Bob',
        email: 'bob@gmail.com',
        phone: '9456474560'
    },
    {
        id: 3,
        name: 'Dave',
        email: 'dave@gmail.com',
        phone: '9459874560'
    }
];

async function startServer(){
    // create apollo server
    const app = express();
    const server = new ApolloServer({
        typeDefs: `#gql
            type User{
                id: ID!
                name: String!
                email: String!
                phone: String!
            }

            type Query{
                getUsers: [User!]!
            }
        `,

        resolvers: {
            Query: {
                getUsers: () => {
                    return users;
                }
            },

            Mutation: {
                createUser: (_, {id, name, email, phone}) => {
                    const newUser = {
                        id: users.length + 1,
                        name,
                        email,
                        phone
                    }
                    users.push(newUser);
                    return newUser;
                },
                updateUser: (_, {id, email}) => {
                    // with the help of id, we find user
                    // and update their email
                    const user = users.find((user) => {
                        return user.id === id;
                    });

                    if(!user){
                        throw new Error(`No user with ${id} exists`);
                    }
                    user.email = email;
                    return user; // return the updated user
                },
                deleteUser: (_, {id}) => {
                    const filtered_users = users.filter((user) => {
                        return user.id !== id;
                    })
                    const final_users = [...users, filtered_users];
                    return filtered_users;
                }
            }
        }
    });

    await server.start();

    // app.use(cors);
    app.use(express.json());

    app.use("/graphql", expressMiddleware(server));

    app.listen(PORT, () => {
        console.log(`Server started at ${PORT}`);
    })

}

startServer();