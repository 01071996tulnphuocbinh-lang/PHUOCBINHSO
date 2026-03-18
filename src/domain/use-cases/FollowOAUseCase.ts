import { OrganizationRepository } from "domain/repositories";

export class FollowOAUseCase {
    constructor(private readonly organizationRepository: OrganizationRepository) {}

    execute(params: { id: string }) {
        return this.organizationRepository.followOA(params);
    }
}
