import {gql} from "@apollo/client"

export const GET_PROJECTS = gql`
    query GetProjects {
        projects {
            id
            title
        }
    }
`