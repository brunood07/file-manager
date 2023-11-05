import { SavedFiles, User } from "@prisma/client";
import { prisma } from "../../../database/prisma";
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
  async create(data: any): Promise<void> {
    await prisma.user.create({
      data
    })
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