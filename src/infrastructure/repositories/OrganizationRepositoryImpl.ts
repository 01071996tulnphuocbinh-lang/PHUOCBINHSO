import { Articles, Organization } from "domain/entities";
import {
    GetArticlesParams,
    GetOrganizationParams,
    OrganizationRepository,
} from "domain/repositories";
import { getArticles, getOrganization } from "infrastructure/api/mock-api";
import { zaloSdk } from "infrastructure/sdk/zalo.sdk";

export class OrganizationRepositoryImpl implements OrganizationRepository {
    getOrganization(params: GetOrganizationParams): Promise<Organization> {
        return getOrganization(params);
    }

    getArticles(params: GetArticlesParams): Promise<Articles> {
        return getArticles(params);
    }

    async followOA(params: { id: string }): Promise<void> {
        await zaloSdk.followOA({ id: params.id });
    }
}
