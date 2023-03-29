import React from "react";

type NoteCardProps = {
  title: string;
  content: string;
  createdAt: string;
  index: number;
  color: string
};


function NoteCard({
                    title,
                    content,
                    createdAt,
                    color,
                    index
                  }: NoteCardProps) {

  return (
    <div
      className={`${color} card shadow-2xl flex flex-col font-fm p-2 border-2 
      border-zinc-700 rounded-2xl break-words -rotate-6 h-48 gap-8
      overflow-clip
      ${index % 2 === 1 && "-ml-1"}
      ${index > 1 && index % 2 === 1 && "-mt-1 -ml-3"}
      ${index > 1 && index % 2 === 0 && "mt-1"}
      `}
      data-testid="note-card"
    >
      <div>
        <h2 className="font-extrabold text-lg">{title}</h2>
        <span>{createdAt}</span>
      </div>
      <p className="text-md opacity-60">{content}</p>
    </div>
  );
}

export default NoteCard;
