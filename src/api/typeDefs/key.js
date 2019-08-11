import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    ## Activate key
    activateKey(key: String!): Boolean!

    ## Deactivate key
    deactivateKey(Key: String!): Boolean!

    ## Generate key
    generateKey(quantity: Int!): [Key!]!
  }

  extend type Query {
    ## Query a specific key
    getOneKey(key: String!): Key!

    ## Query all key
    getAllKey: [Key!]!

    ## Query key by membership type
    getKeyByMembership(type: String!): Key!
  }

  extend type Subscription {
    ## Keep track of real time of how many key has been generated
    keyGenerated: [Key!]
  }

  type Key {
    id: ID!
    key: String!
    user: User!
    membership: Membership!
    isActive: Boolean!
    expiredIn: String!
    expired: String!
    activated: Boolean!
    activatedAt: String!
    createdAt: String!
  }
`;
