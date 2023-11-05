import { SavedFiles } from "@prisma/client";
import { FilesRepository } from "../files-repository";
import { prisma } from "../../../database/prisma";

export class PrismaFilesRepository implements FilesRepository {
  async create(data: any): Promise<void> {
    await prisma.savedFiles.create({
      data
    })
  }

  async findByUserId(userId: string): Promise<SavedFiles[]> {
    const files = await prisma.savedFiles.findMany({
      where: {
        user_id: userId
      }
    });

    return files;
  }

  async findByReference(reference: string): Promise<SavedFiles | null> {
    const file = await prisma.savedFiles.findMany({
      where: {
        file_reference: reference
      }
    })

    if (!file) {
      return null;
    }

    return file[0];
  }

  async deleteById(id: number): Promise<void> {
    await prisma.savedFiles.delete({
      where: {
        id
      }
    })
  }
}