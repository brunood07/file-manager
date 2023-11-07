import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { makeUploadFileUseCase } from './factories/make-upload-file-use-case';

export class UploadFileController {
  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const file = req.files.file as UploadedFile;
      const userId = req.user.id;

      const service = makeUploadFileUseCase();
      const result = await service.execute({
        blobName: `${userId}-${file.name}`,
        buffer: file.data,
        userId
      });

      return res.status(201).send(result);
    } catch (err) {
      return res.status(500).send({ err: err });
    }
  };
}