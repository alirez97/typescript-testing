import { fetchUser } from './api';
import { logger } from './logger';

export type LoginResult = {
  success: boolean;
  message: string;
  userId?: number;
};

export async function login(userId: number, password: string): Promise<LoginResult> {
  if (!userId || !password) {
    logger.error('Missing credentials');
    return { success: false, message: 'Missing credentials' };
  }

  try {
    const user = await fetchUser(userId);
    logger.info(`User ${user.name} logged in`);
    return { success: true, message: 'Login successful', userId: user.id };
  } catch {
    logger.error(`Login failed for userId: ${userId}`);
    return { success: false, message: 'User not found' };
  }
}
