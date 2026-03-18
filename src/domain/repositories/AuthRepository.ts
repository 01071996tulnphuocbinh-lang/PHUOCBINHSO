import { User } from "domain/entities";

export interface AuthRepository {
    getAccessToken(): Promise<string>;
    getUserInfo(): Promise<User>;
}
