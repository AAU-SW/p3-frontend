export function formatDate(
  input: string | Date | undefined,
): string | undefined {
  if (input === undefined) return undefined;
  const date = new Date(input);

  if (isNaN(date.getTime())) {
    return 'Invalid date string';
  }

  return date.toLocaleDateString().split('T')[0];
}
