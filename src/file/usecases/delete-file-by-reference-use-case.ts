import { StorageInterface } from '../../infra/storage/storage';
import { FilesRepository } from '../repositories/files-repository';

interface DeleteFileByReferenceUseCaseRequest {
  file_reference: string;
}

export class DeleteFileByReferenceUseCase {
  constructor(private filesRepository: FilesRepository, private storage: StorageInterface) {}

  execute = async (data: DeleteFileByReferenceUseCaseRequest) => {
    const { file_reference } = data;

    const file = await this.filesRepository.findByReference(file_reference);

    if (!file) {
      throw new Error('File not found');
    }

    this.storage.delete(file_reference);
    await this.filesRepository.deleteById(file.id);
  };
}