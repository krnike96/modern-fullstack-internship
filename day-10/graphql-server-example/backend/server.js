import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

const PORT = 5000;
const app = express();

const users = [
    {
        id: 1,
        name: "niket",
        email: "niket@niket.com",
        phone: "343434343343"
    },
    {
        id: 2,
        name: "tom",
        email: "tom@niket.com",
        phone: "34343424243"
    },
    {
        id: 3,
        name: "jerry",
        email: "jerry@niket.com",
        phone: "3434323423343"
    },
    {
        id: 4,
        name: "jack",
        email: "jack@niket.com",
        phone: "34343563343"
    },
    {
        id: 5,
        name: "oggy",
        email: "oggy@niket.com",
        phone: "34343565443343"
    }
]
async function startServer() {

    const typeDefs = `
        type User{
            id: ID!
            name: String!
            email: String!
            phone: String!
        }

        type Query{
            getUsers: [User!]!
        }

        type Mutation{
            createUser(name:String!, email:String!, phone:String!): User!
            deleteUser(id: ID!): [User!]!
            updateUserEmail(id: ID!, email: String!) : User!
        }
    `;

    // create apollo server
    const server = new ApolloServer({
        typeDefs,
        resolvers: {
            Query: {
                getUsers: () => users
            },

            Mutation: {
                createUser: (parent, { name, email, phone }) => {
                    const newUser = {
                        id: users.length + 1,
                        name,
                        email,
                        phone
                    };

                    users.push(newUser);
                    console.log("User created");
                    return newUser;
                },

                updateUserEmail: (parent, { id, email }) => {
                    // with the help of id, we find user and update their email
                    const user = users.find((user) => {
                        return user.id === Number(id);
                    });

                    // check for undefined
                    if (!user)
                        throw new Error(`User not found with id: ${id}`);

                    // Update the email
                    user.email = email;

                    console.log("User Updated");
                    // return the updated user
                    return user;
                },

                deleteUser: (parent, { id }) => {
                    const filteredUsers = users.filter((user) => {
                        return user.id !== Number(id);
                    })

                    console.log("User Deleted");
                    return filteredUsers;
                }
            }
        }
    });

    await server.start();

    app.use(express.json());

    app.use(cors());

    app.use("/graphql", expressMiddleware(server));

    app.listen(PORT, () => {
        console.log(`Mutation Server running on PORT : ${PORT} `);
    })
}

startServer();