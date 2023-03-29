import React from "react";
import NoteCard from "./NoteCard";
import { useAtom } from "jotai";
import { currentNotesAtom } from "../jotai/notes";

function NotesContainer() {
  const [currentNotes] = useAtom(currentNotesAtom);

  const notes = currentNotes.map((note, idx) => (
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
