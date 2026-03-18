export interface ZaloPermissionRepository {
    getSetting(): Promise<any>;
    authorize(scopes: string[]): Promise<any>;
    getPhoneNumber(): Promise<any>;
    getUserInfo(): Promise<any>;
    checkFollowStatus(): Promise<boolean>;
}
