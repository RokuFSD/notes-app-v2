import {gql} from "@apollo/client"

export const GET_NOTES = gql`
    query GetNotes {
        notes {
            id
            title
            content
            createdDate
            updatedDate
            project {
                id
            }
        }
    }
`