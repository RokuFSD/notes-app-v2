export function classSelector(
  baseClass: string[],
  variants: { [key: string]: string[] }
) {
  return (current: string): string => {
    return baseClass.concat(variants[current]).join(" ");
  };
}
