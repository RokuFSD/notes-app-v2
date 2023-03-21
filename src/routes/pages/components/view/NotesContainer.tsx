import React from "react";
import NoteCard from "../../../../components/NoteCard";

type NotesContainerProps = {
  data: {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    color: number;
  }[];
};

function NotesContainer({ data }: NotesContainerProps) {
  const notes = data.map((note, idx) => (
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
