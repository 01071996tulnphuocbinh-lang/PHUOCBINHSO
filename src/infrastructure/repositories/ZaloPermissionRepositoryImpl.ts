import { ZaloPermissionRepository } from "domain/repositories";
import { zaloSdk } from "infrastructure/sdk/zalo.sdk";

export class ZaloPermissionRepositoryImpl implements ZaloPermissionRepository {
    getSetting(): Promise<any> {
        return zaloSdk.getSetting({});
    }

    authorize(scopes: string[]): Promise<any> {
        return zaloSdk.authorize({ scopes: scopes as any });
    }

    getPhoneNumber(): Promise<any> {
        return zaloSdk.getPhoneNumber({});
    }

    getUserInfo(): Promise<any> {
        return zaloSdk.getUserInfo({ avatarType: "normal" });
    }

    async checkFollowStatus(): Promise<boolean> {
        const setting: any = await this.getSetting();
        return !!setting?.authSetting?.["scope.oaFollow"];
    }
}
