export class BankAccount {
  private balance: number;
  private isLocked: boolean = false;

  constructor(initialBalance: number) {
    if (initialBalance < 0) {
      throw new Error('Initial balance cannot be negative');
    }
    this.balance = initialBalance;
  }

  deposit(amount: number): void {
    if (this.isLocked) throw new Error('Account is locked');
    if (amount <= 0) throw new Error('Deposit amount must be positive');
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (this.isLocked) throw new Error('Account is locked');
    if (amount <= 0) throw new Error('Withdraw amount must be positive');
    if (amount > this.balance) throw new Error('Insufficient funds');
    this.balance -= amount;
  }

  getBalance(): number {
    return this.balance;
  }

  lock(): void {
    this.isLocked = true;
  }

  unlock(): void {
    this.isLocked = false;
  }
}
