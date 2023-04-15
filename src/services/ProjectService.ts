import client from "../lib/client/apollo";
import { CREATE_PROJECT } from "../lib/graphql/mutations/project";
import { ApolloError } from "@apollo/client";
import IDB from "../store/idb";

export class ProjectService {
  static async newProject(
    title: string,
    id: string,
    created: string,
    updated: string
  ) {
    try {
      const { data } = await client.mutate({
        mutation: CREATE_PROJECT,
        variables: {
          title,
          id,
        },
        optimisticResponse: {
          __typename: "Mutation",
          createProject: {
            __typename: "ProjectEntity",
            id,
            title,
          },
        },
        context: {
          metadata: {
            type: "mutation",
          },
        },
      });
      return data;
    } catch (err) {
      if (err instanceof ApolloError && err.networkError) {
        //   Add mutation to queue
        await IDB.addProject({
          title,
          id,
          createdDate: created,
          updatedDate: updated,
          notes: [],
        });
      }
    }
  }
}
