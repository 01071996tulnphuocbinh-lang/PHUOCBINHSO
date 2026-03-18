import { Profile } from "domain/entities";
import { ProfileRepository, SearchProfileParams } from "domain/repositories";
import { searchProfiles } from "infrastructure/api/mock-api";

export class ProfileRepositoryImpl implements ProfileRepository {
    searchProfiles(params: SearchProfileParams): Promise<Profile[] | undefined> {
        return searchProfiles(params);
    }
}
