import { hash } from 'bcryptjs';
import { UsersRepository } from '../repositories/users-repository';

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
            throw new Error('User already exists');
        }

        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
            full_name,
            username,
            password: passwordHash,
        });
    };
}