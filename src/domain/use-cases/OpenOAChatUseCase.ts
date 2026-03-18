import { NavigationRepository } from "domain/repositories";

export class OpenOAChatUseCase {
    constructor(private readonly navigationRepository: NavigationRepository) {}

    execute(oaId: string) {
        return this.navigationRepository.openChat(oaId);
    }
}
