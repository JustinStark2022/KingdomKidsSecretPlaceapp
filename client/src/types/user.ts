export interface User {
    id: string;
    username: string;
    displayName: string;
    role: "parent" | "child";
    createdAt: string;
  }