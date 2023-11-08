import { Request, Response } from 'express';
import { makeGetRecentUploadedFilesUseCase } from './factories/make-get-recent-uploaded-files-use-case';

export class GetRecenteUploadedFilesController {
  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const service = makeGetRecentUploadedFilesUseCase();
      const result = await service.execute();
      return res.status(200).send(result);
    } catch (err) {
      return res.status(500).send({ err: err });
    }
  };
}