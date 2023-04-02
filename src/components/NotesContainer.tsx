import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import { useAtom } from "jotai";
import { Note } from "../../types/state";
import { allNotesAtom } from "../jotai/notes";


type NotesContainerProps = {
  projectId: string
}

function NotesContainer({ projectId }: NotesContainerProps) {
  const [allNotes] = useAtom(allNotesAtom);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (projectId === "default") return setFilteredNotes(allNotes);
    const filteredNotes = allNotes.filter(note => note.project === projectId);
    setFilteredNotes(filteredNotes);
  }, [allNotes, projectId]);

  const notes = filteredNotes.map((note, idx) => (
    <NoteCard
      key={note.id}
      id={note.id}
      title={note.title}
      content={note.content}
      createdAt={note.createdAt}
      index={idx}
      color={note.color}
      project={note.project}
    />
  ));

  return <section className="grid grid-cols-2 w-full">{notes}</section>;
}

export default NotesContainer;
