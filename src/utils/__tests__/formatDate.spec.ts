import { formatDate } from '../formatDate';

describe('formatDate', () => {
  it('should format a date correctly', () => {
    const input = '2024-06-15T12:34:56Z';
    const expected = '6/15/2024';

    const actual = formatDate(input);

    expect(actual).toBe(expected);
  });

  it('should return an error string if date is invalid', () => {
    const input = 'test';
    const expected = 'Invalid date string';

    const actual = formatDate(input);

    expect(actual).toBe(expected);
  });

  it('should return undefined if input is undefined', () => {
    const input = undefined;

    const actual = formatDate(input);

    expect(actual).toBeUndefined();
  });
});
