import { Request, Response } from "express";
import { UploadFileUseCase } from "../usecases/upload-file-use-case";
import { UploadedFile } from 'express-fileupload'
import { PrismaFilesRepository } from "../repositories/prisma/prisma-files-repository";

export class UploadFileController {
  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const file = req.files.file as UploadedFile;
      const userId = req.user.id;

      const service = new UploadFileUseCase(new PrismaFilesRepository());
      const result = await service.execute({
        blobName: `${userId}-${file.name}`,
        buffer: file.data,
        userId
      })

      return res.status(201).send(result);
    } catch (err) {
      return res.status(500).send({ err: err });
    }
  }
}