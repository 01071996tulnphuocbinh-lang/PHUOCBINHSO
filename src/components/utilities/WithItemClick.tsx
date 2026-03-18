import React, { ComponentType } from "react";
import {
    openExternalWebView,
    openPhoneCall,
} from "presentation/services/external-actions.service";
import { useSnackbar, useNavigate } from "zmp-ui";

function WithItemClick<T>(Component: ComponentType<T & object>) {
    return (props: T) => {
        const navigate = useNavigate();
        const { openSnackbar } = useSnackbar();

        const normalizePhoneNumber = (value?: string) =>
            value?.replace(/[^\d+]/g, "").trim();

        const handleClickUtinity = ({
            inDevelopment,
            path,
            phoneNumber,
            link,
        }: {
            inDevelopment?: boolean;
            path?: string;
            phoneNumber?: string;
            link?: string;
        }) => {
            if (inDevelopment) {
                openSnackbar({
                    text: "Tính năng đang được phát triển",
                    type: "info",
                    duration: 3000,
                    verticalAction: true,
                    action: { text: "Đóng", close: true },
                });
            } else if (path) {
                navigate(path, { animate: true, direction: "forward" });
            } else if (phoneNumber) {
                const normalizedPhoneNumber = normalizePhoneNumber(phoneNumber);
                if (!normalizedPhoneNumber) {
                    openSnackbar({
                        text: "Số điện thoại không hợp lệ",
                        type: "error",
                        duration: 3000,
                    });
                    return;
                }

                openPhoneCall(normalizedPhoneNumber).catch(() => {
                    openSnackbar({
                        text: "Không thể mở cuộc gọi, vui lòng thử lại",
                        type: "error",
                        duration: 3000,
                    });
                });
            } else if (link) {
                // NOTE: Promise-based catch để bắt lỗi thật của openWebView (try/catch đồng bộ không bắt được).
                openExternalWebView(link).catch(() => undefined);
            }
        };
        return <Component {...props} handleClickUtinity={handleClickUtinity} />;
    };
}

export default WithItemClick;
