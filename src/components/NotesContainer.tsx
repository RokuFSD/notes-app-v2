import React from "react";
import NoteCard from "./NoteCard";
import { currentNotesAtom } from "../jotai";
import { useAtom } from "jotai";

function NotesContainer() {
  const [currentNotes] = useAtom(currentNotesAtom);

  const notes = currentNotes.map((note, idx) => (
    <NoteCard
      key={note.id}
      title={note.title}
      content={note.content}
      createdAt={note.createdAt}
      index={idx}
      color={note.color}
    />
  ));

  return <section className="grid grid-cols-2 w-full">{notes}</section>;
}

export default NotesContainer;
