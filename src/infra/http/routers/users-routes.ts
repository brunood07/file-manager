import { Router } from 'express';
import { AuthenticateUserController } from '../controllers/authenticate-user-controller';
import { CreateUserController } from '../controllers/create-user-controller';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.post('/session', authenticateUserController.handle);

export { usersRoutes };