import * as Icon from "@components/icons";
import { Utinity } from "@dts";
import Idprocedures from "@assets/id-procedures.png";
import InternalPhone from "@assets/internal-phone.png";

export const APP_UTINITIES: Array<Utinity> = [
    {
        key: "file-search",
        label: "Tra cứu hồ sơ",
        icon: Icon.SearchIcon,
        link: "https://dichvucong.gov.vn/p/home/dvc-tra-cuu-ho-so.html",
    },
    {
        key: "goverment",
        label: "Cổng dịch vụ công quốc gia",
        icon: Icon.PublicserviceportalIcon,
    },
    {
        key: "onlinepayment",
        label: "Thanh toán trực tuyến",
        icon: Icon.OnlinepaymentIcon,
    },
    {
        key: "report",
        label: "Phản ánh kiến nghị",
        icon: Icon.FeedbackIcon,
    },
    {
        key: "assessment",
        label: "Đánh giá cán bộ",
        icon: Icon.AssessmentIcon,
    },
    {
        key: "Webportal",
        label: "Trang thông tin điện tử",
        icon: Icon.WebportalIcon,
        link: "https://phuocbinh.dongnai.gov.vn/",
    },
];

export const CONTACTS: Array<Utinity> = [
    {
        key: "hotline-ubnd",
        label: "UBND phường Phước Bình",
        phoneNumber: "02713778750",
        iconSrc: InternalPhone,
    },
    {
        key: "hotline-ttpvhcc",
        label: "Trung tâm Phục vụ hành chính công",
        phoneNumber: "0849010202",
        iconSrc: InternalPhone,
    },
    {
        key: "113",
        label: "Phản ánh tội phạm, trật tự",
        phoneNumber: "113",
        iconSrc: InternalPhone,
    },
    {
        key: "114",
        label: "Cứu hộ, cứu nạn, hỏa hoạn",
        phoneNumber: "114",
        iconSrc: InternalPhone,
    },
    {
        key: "115",
        label: "Hỗ trợ y tế khẩn cấp 24/7",
        phoneNumber: "115",
        iconSrc: InternalPhone,
    },
];

export const PROCEDURES: Array<Utinity> = [
    {
        key: "1.001612.000.00.00.H19",
        label: "Đăng ký thành lập hộ kinh doanh",
        link: "https://dichvucong.gov.vn/p/home/dvc-danh-sach-dich-vu-cong.html?tu_khoa=&bo_nganh=&tinh_thanh=T%E1%BB%89nh%20%C4%90%E1%BB%93ng%20Nai&so=&quan_huyen=Ph%C6%B0%E1%BB%9Dng%20Ph%C6%B0%E1%BB%9Bc%20B%C3%ACnh&phuong_xa=&ma_tt=1.001612&id_tinh_thanh=13459&id_quan_huyen=21788&id_phuong_xa=undefined&id_so=null&id_bo_nganh=-1",
        iconSrc: Idprocedures,
    },
];
