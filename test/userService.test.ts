import { describe, expect, it, vi } from 'vitest';
import { fetchUser, User } from '../src/api';
import { getUserName } from '../src/userService';

vi.mock('../src/api');

describe('getUserName', () => {
  it('should return name of user', async () => {
    const mockUser: User = { id: 1, name: 'Alireza', email: 'alireza@gmail.com' };

    vi.mocked(fetchUser).mockResolvedValueOnce(mockUser);

    const name = await getUserName(1);

    expect(name).toBe(mockUser.name);
  });
});
