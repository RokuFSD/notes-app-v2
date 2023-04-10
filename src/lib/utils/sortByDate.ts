export default function sortByDate(first: string, second: string) {
  return first > second ? -1 : (first < second ? 1 : 0);
}