import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    ## Save user
    saveUser(email: String!, password: String!): User!

    ## Delete user
    deleteUser(email: String!): Boolean!
  }

  extend type Query {
    ## Check for keys
    getUserKeys(userID: String!): [Key!]

    ## Get all user
    getAllUser: [User!]!

    ## Get one user
    getOneUser(userID: String!): User

    ## Get current user
    me: User
  }

  type User {
    id: ID!
    userID: String!
    email: String!
    key: [Key!]
    createdAt: Date!
  }
`;
