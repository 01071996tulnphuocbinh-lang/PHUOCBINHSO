import { openExternalWebView } from "presentation/services/external-actions.service";

export const openProcedureLink = async (url: string): Promise<void> => {
    await openExternalWebView(url);
};
