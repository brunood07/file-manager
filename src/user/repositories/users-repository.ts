import { User } from '@prisma/client';
import { CreateUserUseCaseRequest } from '../usecases/create-user-use-case';

export interface UsersRepository {
  create(data: CreateUserUseCaseRequest): Promise<void>;
  findByUsername(username: string): Promise<User | null>;
}