import { describe, expect, it, vi } from 'vitest';
import { fetchUser, fetchUsers, User } from '../src/api';
import { getUserCount, getUserName } from '../src/userService';

vi.mock('../src/api');

describe('getUserName', () => {
  it('should return name of user', async () => {
    const mockUser: User = { id: 1, name: 'Alireza', email: 'alireza@gmail.com' };

    vi.mocked(fetchUser).mockResolvedValueOnce(mockUser);

    const name = await getUserName(1);

    expect(name).toBe(mockUser.name);
  });
});

describe('getUserCount', () => {
  it('should return number of users', async () => {
    const mockUsers: User[] = [
      { id: 1, name: 'Alireza', email: 'alireza@gmail.com' },
      { id: 2, name: 'Sara', email: 'sara@gmail.com' },
    ];

    vi.mocked(fetchUsers).mockResolvedValue(mockUsers);

    const count = await getUserCount();

    expect(count).toBe(mockUsers.length);
  });
});
