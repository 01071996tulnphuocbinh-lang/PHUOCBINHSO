import { openOAChat } from "presentation/services/external-actions.service";

export const useOAActions = () => ({
    openChat: (oaId: string) => openOAChat(oaId),
});
