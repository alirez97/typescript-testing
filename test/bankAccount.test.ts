import { describe, expect, it } from 'vitest';
import { BankAccount } from '../src/bankAccount';

describe('BankAccount', () => {
  it('should throw an error if initial balance is negative', () => {
    expect(() => new BankAccount(-1)).toThrow(/negative/i);
  });

  it('should accept zero as initial balance', () => {
    const account = new BankAccount(0);

    expect(account.getBalance()).toBe(0);
  });

  it('should accept positive initial balance', () => {
    const account = new BankAccount(1);

    expect(account.getBalance()).toBe(1);
  });

  it('should throw an error for deposit to locked account', () => {
    const account = new BankAccount(0);
    account.lock();

    expect(() => account.deposit(1)).toThrow(/is locked/i);
  });

  it('should throw an error if deposit amount is not positive', () => {
    const account = new BankAccount(0);

    expect(() => account.deposit(0)).toThrow(/must be positive/i);
    expect(() => account.deposit(-1)).toThrow(/must be positive/i);
  });

  it('should deposit if amount is valid', () => {
    const account = new BankAccount(0);

    account.deposit(1);

    expect(account.getBalance()).toBe(1);
  });

  it('should throw an error for withdraw to locked account', () => {
    const account = new BankAccount(1);
    account.lock();

    expect(() => account.withdraw(1)).toThrow(/is locked/i);
  });

  it('should throw an error if withdraw amount is not positive', () => {
    const account = new BankAccount(1);

    expect(() => account.withdraw(0)).toThrow(/must be positive/i);
    expect(() => account.withdraw(-1)).toThrow(/must be positive/i);
  });

  it('should throw an error if withdraw amount is more than balance', () => {
    const account = new BankAccount(1);

    expect(() => account.withdraw(2)).toThrow(/insufficient funds/i);
  });

  it('should withdraw if amount is valid', () => {
    const account = new BankAccount(1);

    account.withdraw(1);

    expect(account.getBalance()).toBe(0);
  });

  it('should unlock account', () => {
    const account = new BankAccount(0);
    account.lock();
    account.unlock();

    account.deposit(1);

    expect(account.getBalance()).toBe(1);
  });
});
