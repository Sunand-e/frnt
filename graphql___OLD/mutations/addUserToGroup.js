import { gql } from "@apollo/client"

const ADD_USER_TO_GROUP = gql`
  mutation AddUserToGroup($user: ID!, $group: ID!) {
    addUserToGroup(user: $user, group: $group) {
      id
    }
  }
}
`
export default ADD_USER_TO_GROUP