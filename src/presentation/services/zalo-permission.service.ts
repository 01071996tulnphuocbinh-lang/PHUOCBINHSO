import { serviceContainer } from "application/services";

export const getZaloSetting = (): Promise<any> =>
    serviceContainer.getZaloSettingUseCase.execute();

export const authorizeZaloScopes = (scopes: string[]): Promise<any> =>
    serviceContainer.authorizeZaloUseCase.execute(scopes);

export const getZaloPhoneNumber = (): Promise<any> =>
    serviceContainer.getZaloPhoneNumberUseCase.execute();

export const getRawZaloUserInfo = (): Promise<any> =>
    serviceContainer.getRawZaloUserInfoUseCase.execute();

export const checkZaloFollowStatus = (): Promise<boolean> =>
    serviceContainer.checkFollowStatusUseCase.execute();
