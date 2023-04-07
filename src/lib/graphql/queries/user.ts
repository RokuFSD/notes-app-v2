import {gql} from "@apollo/client";

export const USER_EXISTS = gql`
    query UserExists($email: String!) {
        exists(email: $email)
    }
`