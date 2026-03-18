import { User } from "domain/entities";
import { AuthRepository } from "domain/repositories";
import { zaloSdk } from "infrastructure/sdk/zalo.sdk";

export class AuthRepositoryImpl implements AuthRepository {
    async getAccessToken(): Promise<string> {
        const token = (await zaloSdk.getAccessToken({})) || "ACCESS_TOKEN";
        return token;
    }

    async getUserInfo(): Promise<User> {
        const response = await zaloSdk.getUserInfo({ avatarType: "normal" });
        return response.userInfo as User;
    }
}
