import { Request, Response } from "express";
import { z } from "zod";
import { CreateUserUseCase } from "../usecases/create-user-use-case";
import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository";

const createUserSchema = z.object({
  full_name: z.string(),
  username: z.string(),
  password: z.string()
})

export class CreateUserController {
  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const body = createUserSchema.parse(req.body);

      const service = new CreateUserUseCase(new PrismaUsersRepository());
      const create = service.execute(body);
  
      return res.status(201).send();
    } catch (err) {
      return res.status(500).send({ err: err });
    }
  }
}