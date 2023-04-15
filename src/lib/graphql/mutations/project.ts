import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
    mutation CreateProject($title: String!, $id: String!){
        createProject(title: $title, id: $id){
            id
            title
        }
    }
`;
