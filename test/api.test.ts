import { describe, expect, it, vi } from 'vitest';
import { fetchUser, User } from '../src/api';

globalThis.fetch = vi.fn();

describe('fetchUser', () => {
  it('should return a user when response is ok', async () => {
    const mockUser: User = { id: 1, name: 'Alireza', email: 'alireza@gmail.com' };

    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    } as Response);

    const user = await fetchUser(mockUser.id);

    expect(user).toEqual(mockUser);
  });

  it('should throw an error when response is not ok', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => undefined,
    } as Response);

    await expect(fetchUser(1)).rejects.toThrow(/not found: 1/i);
  });
});
