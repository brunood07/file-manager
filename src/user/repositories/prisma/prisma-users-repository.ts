import { User } from '@prisma/client';
import { prisma } from '../../../infra/database/prisma';
import { UsersRepository } from '../users-repository';
import { CreateUserUseCaseRequest } from '../../usecases/create-user-use-case';

export class PrismaUsersRepository implements UsersRepository {
    async create(data: CreateUserUseCaseRequest): Promise<void> {
        await prisma.user.create({
            data
        });
    }

    async findByUsername(username: string): Promise<User | null> {
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