import { Router } from 'express';

import { CreateUserController } from './controllers/create-user-controller';
import { AuthenticateUserController } from './controllers/authenticate-user-controller';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.post('/session', authenticateUserController.handle);

export { usersRoutes };