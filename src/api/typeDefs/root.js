import { gql } from 'apollo-server-express';

export default gql`
  directive @auth(roles: [Role!]) on FIELD_DEFINITION

  directive @guest on FIELD_DEFINITION

  enum Role {
    ADMIN
    USER
  }

  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
  type Subscription {
    _: String
  }
`;
