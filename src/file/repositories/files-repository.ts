import { SavedFiles } from '@prisma/client';

export interface CreateProps {
  file_reference: string;
  user_id: string;
}

export interface FilesRepository {
  create(data: CreateProps): Promise<void>;
  findByUserId(userId: string): Promise<SavedFiles[]>;
  findByReference(reference: string): Promise<SavedFiles | null>;
  deleteById(id: number): Promise<void>;
}