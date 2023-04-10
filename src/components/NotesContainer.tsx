import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import { useAtom } from "jotai";
import { Note } from "../../types/state";
import { allNotesAtom } from "../jotai";
import sortByDate from "../lib/utils/sortByDate";


type NotesContainerProps = {
  projectId: string
}

function NotesContainer({ projectId }: NotesContainerProps) {
  const [allNotes] = useAtom(allNotesAtom);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (projectId === "default") return setFilteredNotes(allNotes.sort((a, b) => sortByDate(a.createdDate, b.createdDate)));
    const filteredNotes = allNotes.filter(note => note.project === projectId);
    setFilteredNotes(filteredNotes.sort((a, b) => sortByDate(a.createdDate, b.createdDate)));
  }, [allNotes, projectId]);

  const notes = filteredNotes.map((note, idx) => (
    <NoteCard
      key={note.id}
      id={note.id}
      title={note.title}
      content={note.content}
      createdAt={note.createdDate}
      index={idx}
      color={"white"}
      project={note.project}
    />
  ));

  return <section className="grid grid-cols-2 w-full">{notes}</section>;
}

export default NotesContainer;
