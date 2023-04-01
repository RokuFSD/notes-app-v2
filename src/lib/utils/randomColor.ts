const colors: [number, string][] = [
  [1, "bg-blue-200"],
  [2, "bg-green-200"],
  [3, "bg-violet-300"],
  [5, "bg-red-200"],
];

const colorsMap = new Map(colors);

export function generateRandomColor() {
  const random = Math.floor(Math.random() * 5) + 1;
  return colorsMap.get(random) as string;
}