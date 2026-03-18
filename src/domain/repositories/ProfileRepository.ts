import { Profile } from "domain/entities";

export interface SearchProfileParams {
    profileCode: string;
    organizationId: string;
}

export interface ProfileRepository {
    searchProfiles(params: SearchProfileParams): Promise<Profile[] | undefined>;
}
