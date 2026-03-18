import { GetArticlesParams, OrganizationRepository } from "domain/repositories";

export class GetArticlesUseCase {
    constructor(private readonly organizationRepository: OrganizationRepository) {}

    execute(params: GetArticlesParams) {
        return this.organizationRepository.getArticles(params);
    }
}
