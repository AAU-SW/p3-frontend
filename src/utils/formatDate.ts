export function formatDate(input: string | undefined): string | undefined {
  if (input === undefined) return undefined;
  const date = new Date(input);

  if (isNaN(date.getTime())) {
    return 'Invalid date string';
  }

  return date.toISOString().split('T')[0];
}
