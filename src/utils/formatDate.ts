export function formatDate(input: string | Date): string {
  let date: Date;

  if (input instanceof Date) {
    date = input;
  } else if (typeof input == 'string') {
    const [day, month, year] = input.split('/');
    date = new Date(`${year}-${month}-${day}`);
  } else {
    throw new Error('Invalid date input');
  }

  return date.toISOString().split('T')[0];
}
