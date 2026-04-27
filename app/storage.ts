// Simple global user storage
// This acts like a mini database using a plain array

export type User = {
  fullName: string;
  username: string;
  password: string;
};

// This array holds all registered users
// We start with one default user so app works immediately
export const users: User[] = [
  { fullName: 'Admin User', username: 'admin', password: '1234' },
];