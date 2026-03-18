import {
    GetInformationGuidesParams,
    InformationGuideRepository,
} from "domain/repositories";

export class GetInformationGuidesUseCase {
    constructor(
        private readonly informationGuideRepository: InformationGuideRepository,
    ) {}

    execute(params: GetInformationGuidesParams) {
        return this.informationGuideRepository.getInformationGuides(params);
    }
}
