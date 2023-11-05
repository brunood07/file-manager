import { Request, Response } from 'express';
import { makeDownloadFileByReferenceUseCase } from '../factories/download-file-by-reference-use-case';

export class DownloadFileByReferenceController {
    handle = async (req: Request, res: Response): Promise<Response> => {
        try {
            const params = req.params;
      
            const service = makeDownloadFileByReferenceUseCase();
            const result = await service.execute({ file_reference: params.reference });
     
            return res.status(200).send({ url: result.fileUrl });
        } catch (err) {
            return res.status(500).send({ err: err });
        }
    };
}