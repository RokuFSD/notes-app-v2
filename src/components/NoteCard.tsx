import React from "react";
import { Link } from "react-router-dom";

type NoteCardProps = {
  id: string
  title: string;
  content: string;
  createdAt: string;
  index: number;
  color: string;
  project: string
};


function NoteCard(
  {
    id,
    title,
    content,
    createdAt,
    color,
    index,
    project
  }: NoteCardProps) {

  return (
    <Link to={`/notes/${id}`} className="w-full h-full" state={{ id, title, content, project }}>
      <div
        className={`${color} card shadow-2xl flex flex-col font-fm p-2 border-2 
      border-zinc-700 rounded-2xl break-words -rotate-6 h-48 gap-8
      overflow-clip
      dark:bg-zinc-100
      dark:border-zinc-300
      ${index % 2 === 1 && "-ml-1"}
      ${index > 1 && index % 2 === 1 && "-mt-1 -ml-3"}
      ${index > 1 && index % 2 === 0 && "mt-1"}
      `}
        data-testid="note-card"
      >
        <div>
          <h2 className="font-extrabold text-lg">{title}</h2>
          <span className="text-sm text-zinc-600 font-semibold dark:text-zinc-400">{createdAt}</span>
        </div>
        <p className="text-md opacity-60">{content}</p>
      </div>
    </Link>
  );
}

export default NoteCard;
