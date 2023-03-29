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
