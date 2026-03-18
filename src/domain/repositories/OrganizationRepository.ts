import { Articles, Organization } from "domain/entities";

export interface GetOrganizationParams {
    miniAppId: string;
}

export interface GetArticlesParams {
    organizationId: string;
    page?: number;
    limit?: number;
}

export interface OrganizationRepository {
    getOrganization(params: GetOrganizationParams): Promise<Organization>;
    getArticles(params: GetArticlesParams): Promise<Articles>;
    followOA(params: { id: string }): Promise<void>;
}
