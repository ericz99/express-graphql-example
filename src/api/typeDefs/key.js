import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    ## Activate key
    activateKey(key: String!): Boolean!

    ## Deactivate key
    deactivateKey(Key: String!): Boolean!

    ## Generate key
    generateKey(quantity: Number!): [Key!]!
  }

  extend type Query {
    ## Query a specific key
    getOneKey(key: String!): Key!

    ## Query all key
    getAllKey: [Key!]!

    ## Query key by membership type
    getKeyByMembership(membership: Membership!): Key!
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
    expiredIn: Date!
    expired: Date!
    activated: Boolean!
    activatedAt: Date!
    createdAt: Date!
  }
`;
