import { User as PrismaUser } from '@prisma/client';
import { prisma } from '../../../infra/database/prisma';
import { UsersRepository } from '../../../domain/user/application/repositories/users-repository';
import { CreateUserUseCaseRequest } from '../../../domain/user/application/usecases/create-user-use-case';

export class PrismaUsersRepository implements UsersRepository {
  async create(data: CreateUserUseCaseRequest): Promise<void> {

    await prisma.user.create({
      data: {
        full_name: data.full_name,
        username: data.username,
        password: data.password
      }
    });
  }

  async findByUsername(username: string): Promise<PrismaUser | null> {
    const user = await prisma.user.findFirst({
      where: {
        username
      }
    });

    if (!user) {
      return null;
    }

    return user;
  }
}