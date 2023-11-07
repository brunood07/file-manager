import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { UsersRepository } from '../repositories/users-repository';
import { env } from '../../../../infra/env';
import { WrongCredentialsError } from '../../../../core/errors/wrong-credentials-error';

interface AuthenticateUserUseCaseRequest {
  username: string;
  password: string;
}

interface AuthenticateUserUseCaseResponse {
  access_token: string;
}

export class AuthenticateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  execute = async (data: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> => {
    const { password, username } = data;

    const user = await this.usersRepository.findByUsername(username);

    if (!user) {
      throw new WrongCredentialsError();
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new WrongCredentialsError();
    }

    const token = sign({ username }, env.CLIENT_SECRET_KEY, {
      subject: user.id,
      expiresIn: '1d'
    });

    return {
      access_token: token
    };
  }; 
}