import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    ## Save user
    registerUser(userName: String!, email: String!, password: String!): User!

    ## Delete user
    deleteUser(email: String!): Boolean!

    ## Login user
    loginUser(email: String!, password: String!): Token!

    ## Change PWD
    resetPassword(email: String!): String!

    ## Change Email
    transferEmail(email: String!): String!
  }

  extend type Query {
    ## Get all user
    getAllUser: [User!]!

    ## Get one user
    getOneUser(userID: String!): User

    ## Get current user
    me: User
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    userName: String!
    userID: String!
    email: String!
    key: Key!
    createdAt: String!
  }
`;
