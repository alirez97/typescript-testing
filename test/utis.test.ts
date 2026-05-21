import { describe, expect, it } from 'vitest';
import { add, capitalize, clamp, isEven } from '../src/utils';

describe('add', () => {
  it('should return sum of 2 numbers', () => {
    expect(add(1, 2)).toBe(3);
    expect(add(20, 40)).toBe(60);
  });

  it('should handle negative numbers', () => {
    expect(add(-1, -2)).toBe(-3);
    expect(add(-1, 1)).toBe(0);
  });
});

describe('capitalize', () => {
  it('should return empty string if arg is empty', () => {
    expect(capitalize('')).toBe('');
  });

  it('should return capitalize string', () => {
    expect(capitalize('alireza')).toBe('Alireza');
  });

  it('should lowercase the rest of string', () => {
    expect(capitalize('aLIREZA')).toBe('Alireza');
  });

  it('should handle single character', () => {
    expect(capitalize('a')).toBe('A');
  });
});

describe('isEven', () => {
  it('should return true if number is isEven', () => {
    expect(isEven(0)).toBe(true);
    expect(isEven(2)).toBe(true);
    expect(isEven(10)).toBe(true);
  });

  it('should return false if number is odd', () => {
    expect(isEven(1)).toBe(false);
    expect(isEven(3)).toBe(false);
  });
});

describe('clamp', () => {
  const min = 10;
  const max = 20;

  it.each<{ scenario: string; clamp: string; value: number; result: number }>([
    {
      scenario: 'value < min',
      clamp: 'min',
      value: 9,
      result: 10,
    },
    {
      scenario: 'value = min',
      clamp: 'min',
      value: 10,
      result: 10,
    },
    {
      scenario: 'min < value < max',
      clamp: 'value',
      value: 15,
      result: 15,
    },
    {
      scenario: 'value = max',
      clamp: 'max',
      value: 20,
      result: 20,
    },
    {
      scenario: 'max < value',
      clamp: 'max',
      value: 21,
      result: 20,
    },
  ])('if $scenario should retrun $clamp', ({ value, result }) => {
    expect(clamp(value, min, max)).toBe(result);
  });
});
