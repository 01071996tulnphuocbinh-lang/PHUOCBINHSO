import { ZaloPermissionRepository } from "domain/repositories";

export class GetZaloPhoneNumberUseCase {
    constructor(
        private readonly zaloPermissionRepository: ZaloPermissionRepository,
    ) {}

    execute() {
        return this.zaloPermissionRepository.getPhoneNumber();
    }
}
