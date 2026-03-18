import { NavigationRepository } from "domain/repositories";
import { zaloSdk } from "infrastructure/sdk/zalo.sdk";

export class NavigationRepositoryImpl implements NavigationRepository {
    async openWebView(url: string): Promise<void> {
        await zaloSdk.openWebview({
            url,
            config: { style: "normal" },
        });
    }

    async openChat(oaId: string): Promise<void> {
        await zaloSdk.openChat({
            type: "oa",
            id: oaId,
        });
    }

    async openPhone(phoneNumber: string): Promise<void> {
        await zaloSdk.openPhone({
            phoneNumber,
            success: () => undefined,
            fail: () => undefined,
        });
    }
}
