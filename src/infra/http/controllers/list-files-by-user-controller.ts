import { Request, Response } from 'express';
import { makeListFilesByUserUseCase } from './factories/make-list-files-by-user-use-case';

export class ListFilesByUserController {
  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = req.user.id;

      const service = makeListFilesByUserUseCase();
      const result = await service.execute({ userId });

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).send({ err: err });
    }
  };
}