import { InformationGuides } from "domain/entities";

export interface GetInformationGuidesParams {
    organizationId: string;
    page?: number;
    limit?: number;
}

export interface InformationGuideRepository {
    getInformationGuides(
        params: GetInformationGuidesParams,
    ): Promise<InformationGuides>;
}
