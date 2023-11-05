import { Request, Response } from "express";
import { ListFilesByUserUseCase } from "../usecases/list-files-by-user-use-case";
import { PrismaFilesRepository } from "../repositories/prisma/prisma-files-repository";

export class ListFilesByUserController {
  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = req.user.id;

      const service = new ListFilesByUserUseCase(new PrismaFilesRepository());
      const result = await service.execute({ userId });

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).send({ err: err });
    }
  }
}