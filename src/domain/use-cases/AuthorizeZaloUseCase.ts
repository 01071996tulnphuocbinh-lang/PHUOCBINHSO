import { ZaloPermissionRepository } from "domain/repositories";

export class AuthorizeZaloUseCase {
    constructor(
        private readonly zaloPermissionRepository: ZaloPermissionRepository,
    ) {}

    execute(scopes: string[]) {
        return this.zaloPermissionRepository.authorize(scopes);
    }
}
