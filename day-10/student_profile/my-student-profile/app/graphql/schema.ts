import { gql } from 'graphql-tag'

export const typeDefs = gql`
  type Student {
    id: ID!
    name: String!
    email: String!
    grade: String
    profileImage: String
    createdAt: String!
    updatedAt: String!
  }

  input CreateStudentInput {
    name: String!
    email: String!
    grade: String
    profileImage: String
  }

  input UpdateStudentInput {
    name: String
    email: String
    grade: String
    profileImage: String
  }

  type Query {
    students: [Student!]!
    student(id: ID!): Student
  }

  type Mutation {
    createStudent(input: CreateStudentInput!): Student!
    updateStudent(id: ID!, input: UpdateStudentInput!): Student!
    deleteStudent(id: ID!): Boolean!
  }
`;
