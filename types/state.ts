import { NoteEntity, ProjectEntity } from "../src/generated/generated.graphql";

export type Project = Omit<ProjectEntity, "notes" | "__typename" | "user"> & {
  notes: Note[];
}

export type Note = Omit<NoteEntity, "project" | "user" | "__typename"> & {
  project: string;
}

export type IdbStore = {
  projects: {
    key: string;
    value: Project
  },
  notes: {
    key: string;
    value: Note
  }
}