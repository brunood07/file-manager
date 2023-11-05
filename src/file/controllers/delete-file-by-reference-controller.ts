import { Request, Response } from 'express';
import { makeDeleteFileByReferenceUseCase } from '../factories/delete-file-by-reference-use-case';

export class DeleteFileByReferenceController {
    handle = async (req: Request, res: Response): Promise<Response> => {
        try {
            const params = req.params;
      
            const service = makeDeleteFileByReferenceUseCase();
            const result = await service.execute({ file_reference: params.reference });
     
            return res.status(204).send(result);
        } catch (err) {
            return res.status(500).send({ err: err });
        }
    };
}