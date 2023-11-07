import { hash } from 'bcryptjs';
import { UsersRepository } from '../repositories/users-repository';
import { UserAlreadyExistsErrors } from '../../../../core/errors/user-already-exists-error';

export interface CreateUserUseCaseRequest {
  full_name: string;
  username: string;
  password: string;
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  execute = async (data: CreateUserUseCaseRequest): Promise<void> => {
    const { full_name, password, username } = data;

    const userExists = await this.usersRepository.findByUsername(username);

    if (userExists) {
      throw new UserAlreadyExistsErrors(username);
    }

    const passwordHash = await hash(password, 8);

    const userInfo = {
      full_name,
      username,
      password: passwordHash
    };

    await this.usersRepository.create(userInfo);
  };
}