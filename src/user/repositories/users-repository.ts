import { SavedFiles, User } from "@prisma/client";

export interface UsersRepository {
  create(data: any): Promise<void>;
  findByUsername(username: string): Promise<User | null>;
}