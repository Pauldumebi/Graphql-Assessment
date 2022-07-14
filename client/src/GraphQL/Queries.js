import { gql } from "@apollo/client";

export const LOAD_USERS = gql`
  query {
    getAllUsers {
      id
      date
      firstName
      age
      height
    }
  }
`;
