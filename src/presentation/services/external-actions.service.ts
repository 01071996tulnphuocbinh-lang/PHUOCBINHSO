import { serviceContainer } from "application/services";

export const openExternalWebView = (url: string): Promise<void> =>
    serviceContainer.openWebViewUseCase.execute(url);

export const openOAChat = (oaId: string): Promise<void> =>
    serviceContainer.openOAChatUseCase.execute(oaId);

export const openPhoneCall = (phoneNumber: string): Promise<void> =>
    serviceContainer.openPhoneUseCase.execute(phoneNumber);
