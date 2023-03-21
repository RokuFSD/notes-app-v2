import React from "react";

type NoteCardProps = {
  title: string;
  description: string;
  createdAt: string;
  //   This is temporal, maybe when we fetch each card in a future this is no more on props
  color: number;
  index: number;
};

const colors: [number, string][] = [
  [1, "bg-blue-200"],
  [2, "bg-green-200"],
  [3, "bg-violet-300"],
];

const colorsMap = new Map(colors);

function NoteCard({
  title,
  description,
  createdAt,
  color,
  index,
}: NoteCardProps) {
  const bgColor = colorsMap.get(color);
  return (
    <div
      className={`${bgColor} drop-shadow-2xl flex flex-col font-fm p-2 border-2 
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
      <p className="text-md opacity-60">{description}</p>
    </div>
  );
}

export default NoteCard;
