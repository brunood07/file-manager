import { Router } from 'express';

import { UploadFileController } from './controllers/upload-file-controller';
import { isAuthenticated } from '../middlewares/is-authenticated';
import { ListFilesByUserController } from './controllers/list-files-by-user-controller';
import { DownloadFileByReferenceController } from './controllers/download-file-by-reference-controller';
import { DeleteFileByReferenceController } from './controllers/delete-file-by-reference-controller';

const fileRoutes = Router();

const uploadFileController = new UploadFileController();
const listFilesByUserController = new ListFilesByUserController();
const downloadFileByReferenceController = new DownloadFileByReferenceController();
const deleteFileByReferenceController = new DeleteFileByReferenceController();

fileRoutes.post('/upload', isAuthenticated, uploadFileController.handle);
fileRoutes.get('/upload', isAuthenticated, listFilesByUserController.handle);
fileRoutes.get('/download/:reference', isAuthenticated, downloadFileByReferenceController.handle);
fileRoutes.delete('/delete/:reference', isAuthenticated, deleteFileByReferenceController.handle);

export { fileRoutes };