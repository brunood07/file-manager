import { UseCaseError } from './use-case-error';

export class UserAlreadyExistsErrors extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`User with same ${identifier} already exists`);
  }
}
