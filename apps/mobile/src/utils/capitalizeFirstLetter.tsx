export function capitalizeFirstLetter(string: string) {
  if (typeof string !== 'string') throw new Error('Input is not a string');
  return string.charAt(0).toUpperCase() + string.slice(1);
}
