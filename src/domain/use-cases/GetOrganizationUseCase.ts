import {
    GetOrganizationParams,
    OrganizationRepository,
} from "domain/repositories";

export class GetOrganizationUseCase {
    constructor(private readonly organizationRepository: OrganizationRepository) {}

    execute(params: GetOrganizationParams) {
        return this.organizationRepository.getOrganization(params);
    }
}
