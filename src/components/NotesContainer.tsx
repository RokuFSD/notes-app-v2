import React, { useMemo } from "react";
import NoteCard from "./NoteCard";
import { notedata } from "../mocks/api";

// type NotesContainerProps = {
//   data: {
//     id: string;
//     title: string;
//     description: string;
//     createdAt: string;
//     color: number;
//     projectId: string;
//   }[];
// };

// Temporary function to filter our mocked data
function filterByProject(data: typeof notedata, projectId: string) {
  if (projectId === "id1") return data;
  return data.filter((note) => note.projectId === projectId);
}

type NotesContainerProps = {
  projectId: string;
};

function NotesContainer({ projectId }: NotesContainerProps) {
  const noteData = useMemo(
    () => filterByProject(notedata, projectId),
    [projectId]
  );
  const notes = noteData.map((note, idx) => (
    <NoteCard
      color={note.color}
      key={note.id}
      title={note.title}
      description={note.description}
      createdAt={note.createdAt}
      index={idx}
    />
  ));

  return <section className="grid grid-cols-2 w-full">{notes}</section>;
}

export default NotesContainer;
