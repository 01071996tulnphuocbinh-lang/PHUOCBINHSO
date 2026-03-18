import { User } from "domain/entities";
import { AuthRepository } from "domain/repositories";

export class GetUserInfoUseCase {
    constructor(private readonly authRepository: AuthRepository) {}

    execute(): Promise<User> {
        return this.authRepository.getUserInfo();
    }
}
