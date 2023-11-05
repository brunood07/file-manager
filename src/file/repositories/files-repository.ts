import { SavedFiles } from "@prisma/client";

export interface FilesRepository {
  create(data: any): Promise<void>;
  findByUserId(userId: string): Promise<SavedFiles[]>;
  findByReference(reference: string): Promise<SavedFiles | null>;
  deleteById(id: number): Promise<void>;
}