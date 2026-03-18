import { ZaloPermissionRepository } from "domain/repositories";

export class CheckFollowStatusUseCase {
    constructor(
        private readonly zaloPermissionRepository: ZaloPermissionRepository,
    ) {}

    execute() {
        return this.zaloPermissionRepository.checkFollowStatus();
    }
}
