export function add(a: number, b: number): number {
  return a + b;
}

export function capitalize(str: string): string {
  if (str.length === 0) return '';
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export function isEven(n: number): boolean {
  return n % 2 === 0;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
