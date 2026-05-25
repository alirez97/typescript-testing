import { logger } from './logger';

export type Order = {
  id: number;
  product: string;
  quantity: number;
};

export function placeOrder(order: Order): string {
  if (order.quantity <= 0) {
    logger.error(`Invalid quantity for order ${order.id}`);
    throw new Error('Quantity must be positive');
  }

  logger.info(`Order ${order.id} placed successfully`);
  return `Order ${order.id} confirmed`;
}
