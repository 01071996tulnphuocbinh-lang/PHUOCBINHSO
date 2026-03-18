import { ZaloPermissionRepository } from "domain/repositories";

export class GetZaloSettingUseCase {
    constructor(
        private readonly zaloPermissionRepository: ZaloPermissionRepository,
    ) {}

    execute() {
        return this.zaloPermissionRepository.getSetting();
    }
}
