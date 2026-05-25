import { beforeEach, describe, expect, it, vi } from 'vitest';
import { logger } from '../src/logger';
import { Order, placeOrder } from '../src/orderService';
const infoSpy = vi.spyOn(logger, 'info');
const errorSpy = vi.spyOn(logger, 'error');

describe('placeOrder', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should throw an error if quantity is zero', () => {
    const order: Order = { id: 1, product: 'MacBook', quantity: 0 };

    expect(() => placeOrder(order)).toThrow(/quantity must be positive/i);
  });

  it('should throw an error if quantity is negative', () => {
    const order: Order = { id: 1, product: 'MacBook', quantity: -1 };

    expect(() => placeOrder(order)).toThrow(/quantity must be positive/i);
  });

  it('should return confirmed if order is valid', () => {
    const order: Order = { id: 1, product: 'MacBook', quantity: 1 };

    expect(placeOrder(order)).toMatch(/confirmed/i);
  });

  it('should call logger.info when order is valid', () => {
    const order: Order = { id: 1, product: 'MacBook', quantity: 1 };
    placeOrder(order);

    expect(infoSpy).toHaveBeenCalledOnce();
    expect(infoSpy).toHaveBeenCalledWith(`Order ${order.id} placed successfully`);
  });

  it('should call logger.error when order is invalid', () => {
    const order: Order = { id: 1, product: 'MacBook', quantity: 0 };
    expect(() => placeOrder(order)).toThrow();

    expect(errorSpy).toHaveBeenCalledOnce();
    expect(errorSpy).toHaveBeenCalledWith(`Invalid quantity for order ${order.id}`);
  });
});
