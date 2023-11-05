import { SavedFiles } from '@prisma/client';
import { FilesRepository } from '../repositories/files-repository';

interface ListFilesByUserUseCaseRequest {
  userId: string;
}

interface ListFilesByUserUseCaseResponse {
  files: SavedFiles[];
}

export class ListFilesByUserUseCase {
    constructor(private filesRepository: FilesRepository) {}

    execute = async (data: ListFilesByUserUseCaseRequest): Promise<ListFilesByUserUseCaseResponse> => {
        const { userId } = data;

        const files = await this.filesRepository.findByUserId(userId);

        return {
            files
        };
    };
}