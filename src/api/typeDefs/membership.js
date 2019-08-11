import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    ## Create membership
    createMembership(type: String!, price: String!, name: String!, desc: String): Membership!

    ## Remove membeship
    removeMembership(name: String!): Membership!
  }

  extend type Query {
    ## Get all membership
    getAllMembership: [Membership!]!

    ## Get by name
    getMembershipByName(name: String!): Membership!

    ## Get by type
    getMembershipByType(type: String!): Membership!
  }

  type Membership {
    id: ID!
    type: String!
    price: String!
    name: String!
    desc: String!
    createdAt: String!
  }
`;
