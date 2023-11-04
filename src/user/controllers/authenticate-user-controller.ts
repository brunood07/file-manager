import { Request, Response } from "express";
import { z } from "zod";
import { AuthenticateUserUseCase } from "../usecases/authenticate-user-use-case";
import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository";

const authenticateUserSchema = z.object({
  username: z.string(),
  password: z.string()
});

export class AuthenticateUserController {
  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const body = authenticateUserSchema.parse(req.body);

      const service = new AuthenticateUserUseCase(new PrismaUsersRepository());
      const result = await service.execute(body);

      return res.status(200).send(result);
    } catch (err) {
      return res.status(500).send({ err: err });
    }
  }
}