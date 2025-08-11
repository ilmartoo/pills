export function pluralize(singular: string, plural: string, size: number) {
  return size === 1 ? singular : plural;
}

export function toggleItem<T>(array: T[], item: T): T[] {
  return array.includes(item) ? array.filter((x) => x !== item) : [...array, item];
}