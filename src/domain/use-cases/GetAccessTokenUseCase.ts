import { AuthRepository } from "domain/repositories";

export class GetAccessTokenUseCase {
    constructor(private readonly authRepository: AuthRepository) {}

    execute(): Promise<string> {
        return this.authRepository.getAccessToken();
    }
}
