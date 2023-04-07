import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  createNote: NoteMutationReturn;
  createProject: ProjectEntity;
  createUser: UserMutationReturn;
};


export type MutationCreateNoteArgs = {
  noteInput: NoteInput;
};


export type MutationCreateProjectArgs = {
  title: Scalars['String'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
};

export type NoteEntity = {
  __typename?: 'NoteEntity';
  content: Scalars['String'];
  createdDate: Scalars['DateTime'];
  id: Scalars['ID'];
  project: ProjectEntity;
  title: Scalars['String'];
  updatedDate: Scalars['DateTime'];
  user: UserEntity;
};

export type NoteInput = {
  content: Scalars['String'];
  projectId: Scalars['Float'];
  title: Scalars['String'];
};

export type NoteMutationReturn = {
  __typename?: 'NoteMutationReturn';
  content: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type ProjectEntity = {
  __typename?: 'ProjectEntity';
  createdDate: Scalars['DateTime'];
  id: Scalars['ID'];
  notes: Array<NoteEntity>;
  title: Scalars['String'];
  updatedDate: Scalars['DateTime'];
  user: UserEntity;
};

export type Query = {
  __typename?: 'Query';
  exists: Scalars['Boolean'];
  notes: Array<NoteEntity>;
  project: ProjectEntity;
  projects: Array<ProjectEntity>;
  user: UserEntity;
};


export type QueryExistsArgs = {
  email: Scalars['String'];
};


export type QueryProjectArgs = {
  id: Scalars['Float'];
};

export type UserEntity = {
  __typename?: 'UserEntity';
  email: Scalars['String'];
  id: Scalars['ID'];
  notes: Array<NoteEntity>;
  projects: Array<ProjectEntity>;
};

export type UserMutationReturn = {
  __typename?: 'UserMutationReturn';
  email: Scalars['String'];
};

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserMutationReturn', email: string } };

export type GetNotesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotesQuery = { __typename?: 'Query', notes: Array<{ __typename?: 'NoteEntity', id: string, title: string, content: string, createdDate: any, updatedDate: any, project: { __typename?: 'ProjectEntity', id: string } }> };

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'ProjectEntity', id: string, title: string, updatedDate: any, createdDate: any, notes: Array<{ __typename?: 'NoteEntity', title: string, content: string, createdDate: any, updatedDate: any }> }> };

export type UserExistsQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type UserExistsQuery = { __typename?: 'Query', exists: boolean };


export const CreateUserDocument = gql`
    mutation CreateUser($email: String!) {
  createUser(email: $email) {
    email
  }
}
    `;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const GetNotesDocument = gql`
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
    `;

/**
 * __useGetNotesQuery__
 *
 * To run a query within a React component, call `useGetNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNotesQuery(baseOptions?: Apollo.QueryHookOptions<GetNotesQuery, GetNotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotesQuery, GetNotesQueryVariables>(GetNotesDocument, options);
      }
export function useGetNotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotesQuery, GetNotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotesQuery, GetNotesQueryVariables>(GetNotesDocument, options);
        }
export type GetNotesQueryHookResult = ReturnType<typeof useGetNotesQuery>;
export type GetNotesLazyQueryHookResult = ReturnType<typeof useGetNotesLazyQuery>;
export type GetNotesQueryResult = ApolloReactCommon.QueryResult<GetNotesQuery, GetNotesQueryVariables>;
export const GetProjectsDocument = gql`
    query GetProjects {
  projects {
    id
    title
    updatedDate
    createdDate
    notes {
      title
      content
      createdDate
      updatedDate
    }
  }
}
    `;

/**
 * __useGetProjectsQuery__
 *
 * To run a query within a React component, call `useGetProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
      }
export function useGetProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
        }
export type GetProjectsQueryHookResult = ReturnType<typeof useGetProjectsQuery>;
export type GetProjectsLazyQueryHookResult = ReturnType<typeof useGetProjectsLazyQuery>;
export type GetProjectsQueryResult = ApolloReactCommon.QueryResult<GetProjectsQuery, GetProjectsQueryVariables>;
export const UserExistsDocument = gql`
    query UserExists($email: String!) {
  exists(email: $email)
}
    `;

/**
 * __useUserExistsQuery__
 *
 * To run a query within a React component, call `useUserExistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserExistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserExistsQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUserExistsQuery(baseOptions: Apollo.QueryHookOptions<UserExistsQuery, UserExistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserExistsQuery, UserExistsQueryVariables>(UserExistsDocument, options);
      }
export function useUserExistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserExistsQuery, UserExistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserExistsQuery, UserExistsQueryVariables>(UserExistsDocument, options);
        }
export type UserExistsQueryHookResult = ReturnType<typeof useUserExistsQuery>;
export type UserExistsLazyQueryHookResult = ReturnType<typeof useUserExistsLazyQuery>;
export type UserExistsQueryResult = ApolloReactCommon.QueryResult<UserExistsQuery, UserExistsQueryVariables>;