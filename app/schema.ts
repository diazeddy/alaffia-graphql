import { gql } from "apollo-server-express";

const Schema = gql`
  type UserLocation {
    id: String!,
    state: String!,
    zip: String!,
    address: String!
  }

  type UserFacility {
    id: String!,
    name: String!,
    createdAt: String!,
    locations: [UserLocation]
  }

  type User {
    id: String!,
    firstName: String!,
    lastName: String!,
    email: String!,
    role: String!,
    createdAt: String!,
    facilities: [UserFacility]
  }

  type LocationFacility {
    id: String!,
    name: String!,
    createdAt: String!
  }

  type LocationUser {
    id: String!,
    firstName: String!,
    lastName: String!,
    email: String!,
    role: String!,
    createdAt: String!
  }

  type Location {
    id: String!,
    state: String!,
    zip: String!,
    address: String!,
    facility: LocationFacility,
    users: [LocationUser]
  }

  type Query {
    user(id: String): User
    usersByLocation(id: String): Location
  }
`

export default Schema;