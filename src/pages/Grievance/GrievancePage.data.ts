export type TabKey = "create" | "mine";

export type MyGrievance = {
    id: string;
    fullName: string;
    phoneNumber: string;
    address: string;
    content: string;
    createdAt: Date;
    hasImage: boolean;
    imageUrl?: string;
    status?: string;
    response?: string;
};

export type CreateGrievancePayload = {
    action: "create-grievance";
    id?: string;
    createdAt?: string;
    fullName: string;
    phoneNumber: string;
    location: string;
    content: string;
    image: string;
    response?: string;
    status?: string;
    userId: string;
    miniAppId: string;
    phoneToken: string;
    category: string;
};

export const GRIEVANCE_LOOKUP_KEY = "pbso_grievance_lookup";
export const DEFAULT_ADDRESS = "Phường Phước Bình, tỉnh Đồng Nai";
export const GRIEVANCE_CATEGORY = "Phản ánh kiến nghị";
export const DEFAULT_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxaz_6qbnV1iOzNdCnGDu45mU7Vbms_GnYuWaC892vvuTxEm0xnBg4l-ZnAW1LXBudrPw/exec";

export const AREA_OPTIONS = [
    "Phường Phước Bình, tỉnh Đồng Nai",
    "Khu phố 1, phường Phước Bình, tỉnh Đồng Nai",
    "Khu phố 2, phường Phước Bình, tỉnh Đồng Nai",
    "Khu phố 3, phường Phước Bình, tỉnh Đồng Nai",
    "Khu phố 4, phường Phước Bình, tỉnh Đồng Nai",
    "Khu phố 5, phường Phước Bình, tỉnh Đồng Nai",
    "Khu phố 6, phường Phước Bình, tỉnh Đồng Nai",
    "Khu phố 7, phường Phước Bình, tỉnh Đồng Nai",
    "Khu phố 8, phường Phước Bình, tỉnh Đồng Nai",
    "Khu phố 9, phường Phước Bình, tỉnh Đồng Nai",
    "Khu phố 10, phường Phước Bình, tỉnh Đồng Nai",
    "Khu phố Sơn Hà 1, phường Phước Bình, tỉnh Đồng Nai",
    "Khu phố Sơn Hà 2, phường Phước Bình, tỉnh Đồng Nai",
    "Khu phố Phú Châu, phường Phước Bình, tỉnh Đồng Nai",
    "Khu phố Bình Điền, phường Phước Bình, tỉnh Đồng Nai",
    "Khu phố Bình Minh, phường Phước Bình, tỉnh Đồng Nai",
    "Khu phố Nhơn Hòa 1, phường Phước Bình, tỉnh Đồng Nai",
    "Khu phố Nhơn Hòa 2, phường Phước Bình, tỉnh Đồng Nai",
    "Khu phố An Lương, phường Phước Bình, tỉnh Đồng Nai",
    "Khu phố Bù Xiết, phường Phước Bình, tỉnh Đồng Nai",
    "Khu phố Long Điền 1, phường Phước Bình, tỉnh Đồng Nai",
    "Khu phố Long Điền 2, phường Phước Bình, tỉnh Đồng Nai",
    "Khu phố Phước Vĩnh, phường Phước Bình, tỉnh Đồng Nai",
    "Khu phố Phước Trung, phường Phước Bình, tỉnh Đồng Nai",
    "Khu phố Phước Sơn, phường Phước Bình, tỉnh Đồng Nai",
    "Khu phố Phước An, phường Phước Bình, tỉnh Đồng Nai",
    "Khu phố Long Giang, phường Phước Bình, tỉnh Đồng Nai",
    "Khu phố Long Phước, phường Phước Bình, tỉnh Đồng Nai",
    "Khu phố Phước Hiệp, phường Phước Bình, tỉnh Đồng Nai",
];
