import { fetchUser, fetchUsers } from './api';

export async function getUserName(id: number): Promise<string> {
  const user = await fetchUser(id);
  return user.name;
}

export async function getUserCount(): Promise<number> {
  const users = await fetchUsers();
  return users.length;
}

export async function isValidUser(id: number): Promise<boolean> {
  try {
    await fetchUser(id);
    return true;
  } catch {
    return false;
  }
}
