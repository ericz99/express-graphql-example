import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    ## Activate key
    activateKey(key: String!): Boolean! @auth(roles: [USER])

    ## Deactivate key
    deactivateKey(key: String!): Boolean! @auth(roles: [USER])

    ## Generate key
    generateKey(quantity: Int!): [Key!]! @auth(roles: [ADMIN])
  }

  extend type Query {
    ## Query a specific key
    getOneKey(key: String!): Key! @auth(roles: [ADMIN])

    ## Query all key
    getAllKey: [Key!]! @auth(roles: [ADMIN])
  }

  extend type Subscription {
    ## Keep track of real time of how many key has been generated
    generatedKey: [Key!]
  }

  type Key {
    id: ID!
    key: String!
    user: User!
    isActive: Boolean!
    expiredIn: String!
    expired: String!
    activated: Boolean!
    activatedAt: String!
    createdAt: String!
  }
`;
