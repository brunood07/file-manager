import express from 'express';
import fileUpload from 'express-fileupload';
import { fileRoutes } from './infra/http/routers/file-routes';
import { usersRoutes } from './infra/http/routers/users-routes';

const app = express();

app.use(express.json());
app.use(fileUpload());
app.use('/users', usersRoutes);
app.use('/blobs', fileRoutes);

export { app };