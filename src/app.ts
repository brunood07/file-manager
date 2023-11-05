import express from 'express';
import fileUpload from 'express-fileupload';
import { usersRoutes } from './user/users-routes';
import { fileRoutes } from './file/fileRoutes';

const app = express();

app.use(express.json());
app.use(fileUpload());
app.use("/users", usersRoutes);
app.use("/blobs", fileRoutes);

export { app };