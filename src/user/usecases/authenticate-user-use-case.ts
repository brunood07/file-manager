import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { UsersRepository } from '../repositories/users-repository';

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
      throw new Error('username of password invalid');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('username of password invalid');
    }

    const token = sign({ username }, String(process.env.CLIENT_SECRET_KEY), {
      subject: user.id,
      expiresIn: '1d'
    });

    return {
      access_token: token
    };
  }; 
}