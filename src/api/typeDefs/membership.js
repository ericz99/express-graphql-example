import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    ## Create membership
    createMembership(type: String!, price: String!, name: String!, desc: String): Membership!
      @auth(roles: [ADMIN])

    ## Remove membeship
    removeMembership(name: String!): Membership! @auth(roles: [ADMIN])
  }

  extend type Query {
    ## Get all membership
    getAllMembership: [Membership!]! @auth(roles: [ADMIN])

    ## Get by name
    getMembershipByName(name: String!): Membership! @auth(roles: [ADMIN])

    ## Get by type
    getMembershipByType(type: String!): Membership! @auth(roles: [ADMIN])
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
