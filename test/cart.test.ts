import { beforeEach, describe, expect, it } from 'vitest';
import { Product, ShoppingCart } from '../src/cart';

describe('ShoppingCart', () => {
  let cart: ShoppingCart;
  const product1: Product = { id: 1, name: 'MacBook', price: 1000 };
  const product2: Product = { id: 2, name: 'Iphone', price: 500 };

  beforeEach(() => {
    cart = new ShoppingCart();
  });

  it('should add product to cart', () => {
    cart.add(product1);
    cart.add(product2);

    expect(cart.getItems()).toEqual([product1, product2]);
  });

  it('should remove product from cart', () => {
    cart.add(product1);

    cart.remove(product1.id);

    expect(cart.getItems()).toHaveLength(0);
  });

  it('should return sum of items price', () => {
    cart.add(product1);
    cart.add(product2);

    expect(cart.getTotalPrice()).toBe(product1.price + product2.price);
  });

  it('should remove all items in cart', () => {
    cart.add(product1);
    cart.add(product2);

    cart.clear();

    expect(cart.getItems()).toHaveLength(0);
  });

  it('should check if item is in cart', () => {
    cart.add(product1);

    expect(cart.hasItem(product1.id)).toBe(true);
    expect(cart.hasItem(99)).toBe(false);
  });
});
