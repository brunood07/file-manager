import { Request, Response } from 'express';
import { z } from 'zod';
import { makeCreateUserUseCase } from '../factories/make-create-user-use-case';

const createUserSchema = z.object({
  full_name: z.string(),
  username: z.string(),
  password: z.string()
});

export class CreateUserController {
  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const body = createUserSchema.parse(req.body);

      const service = makeCreateUserUseCase();
      await service.execute(body);
  
      return res.status(201).send();
    } catch (err) {
      return res.status(500).send({ err: err });
    }
  };
}