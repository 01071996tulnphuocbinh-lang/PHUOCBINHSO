import {
    checkZaloFollowStatus,
} from "presentation/services/zalo-permission.service";
import { openOAChat } from "presentation/services/external-actions.service";
import { serviceContainer } from "application/services";

export const checkFollowStatus = async (): Promise<boolean> => {
    try {
        return await checkZaloFollowStatus();
    } catch (error) {
        console.error("Loi kiem tra trang thai OA:", error);
        return false;
    }
};

export const requestFollowOA = async (
    oaId: string,
): Promise<{ success: boolean; msg?: string }> => {
    try {
        // Gọi trực tiếp followOA để Zalo hiển thị popup xin quan tâm OA.
        await serviceContainer.followOAUseCase.execute({ id: oaId });
        return { success: true };
    } catch (error: any) {
        const code = String(error?.code ?? error?.error ?? "");
        if (code === "-2002" || code === "-2003" || code === "-1") {
            return {
                success: false,
                msg: "Ban da dong hoac tu choi yeu cau quan tam OA",
            };
        }

        console.error("Loi goi followOA:", error);
        return { success: false, msg: "Khong the quan tam OA luc nay" };
    }
};

export const waitForFollowStatus = async (
    retries = 10,
    intervalMs = 400,
): Promise<boolean> => {
    /* eslint-disable no-await-in-loop */
    for (let i = 0; i < retries; i += 1) {
        const followed = await checkFollowStatus();
        if (followed) return true;
        await new Promise<void>(resolve => {
            setTimeout(() => resolve(), intervalMs);
        });
    }
    /* eslint-enable no-await-in-loop */
    return false;
};

export const openOAByChat = async (oaId: string) => {
    try {
        await openOAChat(oaId);
    } catch (error: any) {
        console.error("Loi chi tiet:", error);
        alert(`Khong the mo chat: ${JSON.stringify(error)}`);
    }
};
