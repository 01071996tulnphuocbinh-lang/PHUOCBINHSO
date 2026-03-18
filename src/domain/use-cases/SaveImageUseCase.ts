import { MediaRepository } from "domain/repositories";

export class SaveImageUseCase {
    constructor(private readonly mediaRepository: MediaRepository) {}

    execute(img: string) {
        return this.mediaRepository.saveImage(img);
    }
}
