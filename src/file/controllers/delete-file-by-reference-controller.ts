import { Request, Response, response } from "express";
import fs from 'fs';
import { DownloadFileByReferenceUseCase } from "../usecases/download-file-by-reference-use-case";
import { DeleteFileByReferenceUseCase } from "../usecases/delete-file-by-reference-use-case";
import { PrismaFilesRepository } from "../repositories/prisma/prisma-files-repository";

export class DeleteFileByReferenceController {
  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const params = req.params;
      
      const service = new DeleteFileByReferenceUseCase(new PrismaFilesRepository());
      const result = await service.execute({ file_reference: params.reference });
     
      return res.status(204).send(result);
    } catch (err) {
      return res.status(500).send({ err: err })
    }
  }
}