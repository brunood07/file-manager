import { CreateUserUseCase } from '../../../../domain/user/application/usecases/create-user-use-case';
import { PrismaUsersRepository } from '../../../database/prisma-repositories/prisma-users-repository';

export function makeCreateUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const service = new CreateUserUseCase(usersRepository);

  return service;
}