import { InformationGuides } from "domain/entities";
import {
    GetInformationGuidesParams,
    InformationGuideRepository,
} from "domain/repositories";
import { getInformationGuides } from "infrastructure/api/mock-api";

export class InformationGuideRepositoryImpl
    implements InformationGuideRepository
{
    getInformationGuides(
        params: GetInformationGuidesParams,
    ): Promise<InformationGuides> {
        return getInformationGuides(params);
    }
}
