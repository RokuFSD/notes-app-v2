export type Project = {
  id: string;
  name: string;
  notes: Note[];
}

export type Note = {
  id: string;
  project: string;
  title: string;
  content: string;
  createdAt: string;
  color: string;
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