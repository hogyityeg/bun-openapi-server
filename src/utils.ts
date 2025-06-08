export function firstOrFail<T>(array: T[], predicate: (item: T) => boolean): T {
  const firstMatch = array.find(predicate);
  if (!firstMatch) {
    throw new Error('No matching item found in the array');
  }
  return firstMatch;
}

export function first<T>(
  array: T[],
  predicate?: (item: T) => boolean
): T | undefined {
  if (predicate) {
    return array.find(predicate);
  }
  return array[0];
}

export function single<T>(array: T[], predicate?: (item: T) => boolean): T {
  const filteredArray = predicate ? array.filter(predicate) : array;
  if (filteredArray.length !== 1) {
    throw new Error('Array does not contain exactly one item');
  }
  return filteredArray[0];
}

export function isRouteParameter(segment: string): boolean {
  return segment.startsWith('{') && segment.endsWith('}');
}
