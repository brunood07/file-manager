declare namespace Express {
  export interface Request {
      user: {
          id: string;
      };
      files: {
        file: UploadedFile;
      }
  }
}