import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
}

export async function isAuthenticated(request: Request, response: Response, next: NextFunction) {

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token missing!');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, String(process.env.CLIENT_SECRET_KEY)) as IPayload;

    request.user = {
      id: user_id
    };

    next();
  } catch {
    throw new Error('Invalid token!');
  }
}