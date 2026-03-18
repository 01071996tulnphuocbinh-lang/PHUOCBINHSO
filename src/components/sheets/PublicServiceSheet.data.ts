import * as AppIcon from "@components/icons";
import { ComponentType } from "react";

export type PublicServiceSheetType = "public" | "payment";

export interface PublicServiceSheetProps {
    visible: boolean;
    type: PublicServiceSheetType;
    onClose: () => void;
}

export interface PublicServiceItem {
    key: string;
    label: string;
    note: string;
    icon: ComponentType<{ size?: number }>;
    link: string;
}

export interface PublicServiceSection {
    title: string;
    items: PublicServiceItem[];
}

export const PUBLIC_SERVICE_DATA_MAP: Record<
    PublicServiceSheetType,
    PublicServiceSection
> = {
    public: {
        title: "Cổng dịch vụ công",
        items: [
            {
                key: "dvcqg",
                label: "Dịch vụ công Quốc gia",
                note: "Thực hiện thủ tục hành chính trực tuyến",
                icon: AppIcon.PublicserviceportalIcon,
                link: "https://dichvucong.gov.vn/",
            },
            {
                key: "dvclt",
                label: "Dịch vụ công Liên thông",
                note: "Giải quyết thủ tục nhiều cấp phối hợp",
                icon: AppIcon.PublicserviceportalIcon,
                link: "https://lienthong.dichvucong.gov.vn/",
            },
        ],
    },
    payment: {
        title: "Thanh toán trực tuyến",
        items: [
            {
                key: "fee",
                label: "Thanh toán phí, lệ phí",
                note: "Nộp phí hồ sơ dịch vụ công",
                icon: AppIcon.OnlinepaymentIcon,
                link: "https://dichvucong.gov.vn/p/home/dvc-thanh-toan-phi-le-phi-ho-so.html",
            },
            {
                key: "tax",
                label: "Nghĩa vụ tài chính",
                note: "Thuế đất đai, hộ kinh doanh...",
                icon: AppIcon.OnlinepaymentIcon,
                link: "https://dichvucong.gov.vn/p/home/dvc-thanh-toan-thue-dat-dai.html",
            },
        ],
    },
};
