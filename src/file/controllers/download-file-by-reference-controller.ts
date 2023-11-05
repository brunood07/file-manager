import { Request, Response, response } from "express";
import fs from 'fs';
import { DownloadFileByReferenceUseCase } from "../usecases/download-file-by-reference-use-case";

export class DownloadFileByReferenceController {
  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const params = req.params;
      
      const service = new DownloadFileByReferenceUseCase();
      const result = await service.execute({ file_reference: params.reference });
     
      return res.status(200).send({ url: result.fileUrl });
    } catch (err) {
      return res.status(500).send({ err: err })
    }
  }
}