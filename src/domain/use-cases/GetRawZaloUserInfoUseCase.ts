import { ZaloPermissionRepository } from "domain/repositories";

export class GetRawZaloUserInfoUseCase {
    constructor(
        private readonly zaloPermissionRepository: ZaloPermissionRepository,
    ) {}

    execute() {
        return this.zaloPermissionRepository.getUserInfo();
    }
}
