export type Product = {
  id: number;
  name: string;
  price: number;
};

export class ShoppingCart {
  private items: Product[] = [];

  add(product: Product): void {
    this.items.push(product);
  }

  remove(id: number): void {
    this.items = this.items.filter((item) => item.id !== id);
  }

  getItems(): Product[] {
    return this.items;
  }

  getTotalPrice(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }

  clear(): void {
    this.items = [];
  }

  hasItem(id: number): boolean {
    return this.items.some((item) => item.id === id);
  }
}
