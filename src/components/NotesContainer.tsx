import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import IDB from "../store/idb";
import { Note } from "../../types/state";

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

type NotesContainerProps = {
  projectId: string;
};

function NotesContainer({ projectId }: NotesContainerProps) {
  // const noteData = useMemo(
  //   () => filterByProject(notedata, projectId),
  //   [projectId]
  // );
  const [noteData, setNoteData] = useState<Note[]>([]);


  // Temporary effect previous apollo client implementation
  useEffect(() => {
    if (!projectId) return;

    async function getNotes() {
      const notes = await IDB.getProjectNotes(projectId);
      setNoteData(notes);
    }

    void getNotes();
  }, [projectId]);


  const notes = noteData.map((note, idx) => (
    <NoteCard
      key={note.id}
      title={note.title}
      content={note.content}
      createdAt={note.createdAt}
      index={idx}
    />
  ));

  return <section className="grid grid-cols-2 w-full">{notes}</section>;
}

export default NotesContainer;
