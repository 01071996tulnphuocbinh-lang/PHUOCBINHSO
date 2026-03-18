export interface NavigationRepository {
    openWebView(url: string): Promise<void>;
    openChat(oaId: string): Promise<void>;
    openPhone(phoneNumber: string): Promise<void>;
}
