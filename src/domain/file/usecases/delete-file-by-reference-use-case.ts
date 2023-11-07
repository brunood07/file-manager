import { NotAllowedError } from '../../../core/errors/not-allowed-error';
import { ResourceNotFoundError } from '../../../core/errors/resource-not-found';
import { StorageInterface } from '../../../infra/storage/storage';
import { FilesRepository } from '../repositories/files-repository';

interface DeleteFileByReferenceUseCaseRequest {
  file_reference: string;
  userId: string;
}

export class DeleteFileByReferenceUseCase {
  constructor(private filesRepository: FilesRepository, private storage: StorageInterface) {}

  execute = async (data: DeleteFileByReferenceUseCaseRequest) => {
    const { file_reference, userId } = data;

    if (file_reference.split('-')[0] !== userId) {
      throw new NotAllowedError();
    }

    const file = await this.filesRepository.findByReference(file_reference);

    if (!file) {
      throw new ResourceNotFoundError();
    }

    this.storage.delete(file_reference);
    await this.filesRepository.deleteById(file.id);
  };
}