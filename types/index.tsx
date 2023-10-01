export type User =
  | {
      id: string;
      name: string | null;
      email: string;
      password: string;
    }
  | undefined;
