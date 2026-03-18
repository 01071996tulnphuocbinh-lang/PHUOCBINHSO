import { ProfileRepository, SearchProfileParams } from "domain/repositories";

export class SearchProfilesUseCase {
    constructor(private readonly profileRepository: ProfileRepository) {}

    execute(params: SearchProfileParams) {
        return this.profileRepository.searchProfiles(params);
    }
}
