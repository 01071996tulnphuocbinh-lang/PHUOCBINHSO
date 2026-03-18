import { MediaRepository, PickImageParams } from "domain/repositories";

export class PickImagesUseCase {
    constructor(private readonly mediaRepository: MediaRepository) {}

    execute(params: PickImageParams) {
        return this.mediaRepository.pickImages(params);
    }
}
