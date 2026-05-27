import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchUser } from '../src/api';
import { login } from '../src/authService';
import { logger } from '../src/logger';

vi.mock('../src/api');
vi.mock('../src/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

const mockedFetchUser = vi.mocked(fetchUser);

describe('login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return failure if userId is missing (0)', async () => {
    const result = await login(0, 'secret123');

    expect(result).toEqual({ success: false, message: 'Missing credentials' });
    expect(logger.error).toHaveBeenCalledWith('Missing credentials');
    expect(mockedFetchUser).not.toHaveBeenCalled();
  });

  it('should return failure if password is empty string', async () => {
    const result = await login(1, '');

    expect(result).toEqual({ success: false, message: 'Missing credentials' });
    expect(logger.error).toHaveBeenCalledWith('Missing credentials');
    expect(mockedFetchUser).not.toHaveBeenCalled();
  });

  it('should return success with userId when credentials are valid', async () => {
    mockedFetchUser.mockResolvedValue({ id: 42, name: 'Ali', email: 'a@gmail.com' });

    const result = await login(42, 'secret123');

    expect(result).toEqual({ success: true, message: 'Login successful', userId: 42 });
    expect(mockedFetchUser).toHaveBeenCalledWith(42);
    expect(logger.info).toHaveBeenCalledWith('User Ali logged in');
  });

  it('should return failure when fetchUser throws an error', async () => {
    mockedFetchUser.mockRejectedValue(new Error('User not found'));

    const result = await login(99, 'wrongpass');

    expect(result).toEqual({ success: false, message: 'User not found' });
    expect(logger.error).toHaveBeenCalledWith('Login failed for userId: 99');
  });

  it('should not call logger.info when fetchUser throws', async () => {
    mockedFetchUser.mockRejectedValue(new Error('DB error'));

    await login(5, 'pass');

    expect(logger.info).not.toHaveBeenCalled();
  });
});
