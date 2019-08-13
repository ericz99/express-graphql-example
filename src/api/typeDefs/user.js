import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    ## Save user
    registerUser(userName: String!, email: String!, password: String!): User! @guest

    ## Login user
    loginUser(email: String!, password: String!): Token! @guest

    ## Admin register
    registerAdmin(userName: String!, email: String!, password: String!, ownerKey: String!): User!
      @guest

    ## Admin login
    loginAdmin(email: String!, password: String!): Token! @guest

    ## Delete user
    deleteUser(email: String!): Boolean! @auth(roles: [ADMIN])

    ## Change PWD
    resetPassword(email: String!): String! @guest

    ## Update PWD
    updatePassword(password: String!, token: String!): String! @guest

    ## Change Email
    transferEmail(email: String!): String! @auth(roles: [USER])
  }

  extend type Query {
    ## Get all user
    getAllUser: [User!]! @auth(roles: [ADMIN])

    ## Get one user
    getOneUser(userID: String!): User @auth(roles: [ADMIN])

    ## Get current user
    me: User @auth(roles: [USER, ADMIN])
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    userName: String!
    userID: String!
    email: String!
    role: Role
    key: Key!
    createdAt: String!
  }
`;
