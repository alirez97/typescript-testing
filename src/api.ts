export type User = {
  id: number;
  name: string;
  email: string;
};

export async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

  if (!response.ok) {
    throw new Error(`User not found: ${id}`);
  }

  return response.json();
}

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return response.json();
}

fetchUser(1);
