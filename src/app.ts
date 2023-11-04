import express from 'express';

import { usersRoutes } from './user/users-routes';

const app = express();

app.use(express.json());
app.use("/users", usersRoutes);

export { app };