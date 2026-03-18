import Idprocedures from "@assets/id-procedures.png";

export interface ProcedureItem {
    key: string;
    label: string;
    link: string;
    iconSrc: string;
}

export interface ProcedureGroup {
    key: string;
    title: string;
    note?: string;
    iconSrc: string;
    items: ProcedureItem[];
}

export const PROCEDURE_GROUPS: ProcedureGroup[] = [
    {
        key: "chuongthuc",
        title: "Chứng thực điện tử",
        note: "Chứng thực bản sao, chữ ký, điểm chỉ văn bản",
        iconSrc: Idprocedures,
        items: [
            {
                key: "2.000815",
                label: "Chứng thực bản sao từ bản chính giấy tờ, văn bản do cơ quan, tổ chức có thẩm quyền của Việt Nam; cơ quan, tổ chức có thẩm quyền của nước ngoài; cơ quan, tổ chức có thẩm quyền của Việt Nam liên kết với cơ quan, tổ chức có thẩm quyền của nước ngoài cấp hoặc chứng nhận",
                link: "https://dichvucong.gov.vn/p/home/dvc-danh-sach-dich-vu-cong.html?tu_khoa=&bo_nganh=&tinh_thanh=T%E1%BB%89nh%20%C4%90%E1%BB%93ng%20Nai&so=&quan_huyen=Ph%C6%B0%E1%BB%9Dng%20Ph%C6%B0%E1%BB%9Bc%20B%C3%ACnh&phuong_xa=&ma_tt=2.000815&id_tinh_thanh=13459&id_quan_huyen=21788&id_phuong_xa=undefined&id_so=null&id_bo_nganh=-1#tthcName",
                iconSrc: Idprocedures,
            },
            {
                key: "2.000884",
                label: "Thủ tục chứng thực chữ ký trong các giấy tờ, văn bản (áp dụng cho cả trường hợp chứng thực điểm chỉ và trường hợp người yêu cầu chứng thực không thể ký, không thể điểm chỉ được)",
                link: "https://dichvucong.gov.vn/p/home/dvc-danh-sach-dich-vu-cong.html?tu_khoa=&bo_nganh=&tinh_thanh=T%E1%BB%89nh%20%C4%90%E1%BB%93ng%20Nai&so=&quan_huyen=Ph%C6%B0%E1%BB%9Dng%20Ph%C6%B0%E1%BB%9Bc%20B%C3%ACnh&phuong_xa=&ma_tt=2.000884&id_tinh_thanh=13459&id_quan_huyen=21788&id_phuong_xa=undefined&id_so=null&id_bo_nganh=-1",
                iconSrc: Idprocedures,
            },
        ],
    },
    {
        key: "hotich",
        title: "Hộ tịch",
        note: "Hộ tịch, Đăng ký thường trú, Quản lý thu, Sổ, thẻ",
        iconSrc: Idprocedures,
        items: [
            {
                key: "1.000894",
                label: "Thủ tục đăng ký kết hôn",
                link: "https://dichvucong.gov.vn/p/home/dvc-danh-sach-dich-vu-cong.html?tu_khoa=&bo_nganh=&tinh_thanh=T%E1%BB%89nh%20%C4%90%E1%BB%93ng%20Nai&so=&quan_huyen=Ph%C6%B0%E1%BB%9Dng%20Ph%C6%B0%E1%BB%9Bc%20B%C3%ACnh&phuong_xa=&ma_tt=1.000894&id_tinh_thanh=13459&id_quan_huyen=21788&id_phuong_xa=undefined&id_so=null&id_bo_nganh=-1#tthcName",
                iconSrc: Idprocedures,
            },
            {
                key: "1.004746",
                label: "Thủ tục đăng ký lại kết hôn",
                link: "https://dichvucong.gov.vn/p/home/dvc-danh-sach-dich-vu-cong.html?tu_khoa=&bo_nganh=&tinh_thanh=T%E1%BB%89nh%20%C4%90%E1%BB%93ng%20Nai&so=&quan_huyen=Ph%C6%B0%E1%BB%9Dng%20Ph%C6%B0%E1%BB%9Bc%20B%C3%ACnh&phuong_xa=&ma_tt=1.004746&id_tinh_thanh=13459&id_quan_huyen=21788&id_phuong_xa=undefined&id_so=null&id_bo_nganh=-1",
                iconSrc: Idprocedures,
            },
            {
                key: "1.004873",
                label: "Thủ tục cấp Giấy xác nhận tình trạng hôn nhân",
                link: "https://dichvucong.gov.vn/p/home/dvc-danh-sach-dich-vu-cong.html?tu_khoa=&bo_nganh=&tinh_thanh=T%E1%BB%89nh%20%C4%90%E1%BB%93ng%20Nai&so=&quan_huyen=Ph%C6%B0%E1%BB%9Dng%20Ph%C6%B0%E1%BB%9Bc%20B%C3%ACnh&phuong_xa=&ma_tt=1.004873&id_tinh_thanh=13459&id_quan_huyen=21788&id_phuong_xa=undefined&id_so=null&id_bo_nganh=-1",
                iconSrc: Idprocedures,
            },
            {
                key: "1.004884",
                label: "Thủ tục đăng ký lại khai sinh",
                link: "https://dichvucong.gov.vn/p/home/dvc-danh-sach-dich-vu-cong.html?tu_khoa=&bo_nganh=&tinh_thanh=T%E1%BB%89nh%20%C4%90%E1%BB%93ng%20Nai&so=&quan_huyen=Ph%C6%B0%E1%BB%9Dng%20Ph%C6%B0%E1%BB%9Bc%20B%C3%ACnh&phuong_xa=&ma_tt=1.004884&id_tinh_thanh=13459&id_quan_huyen=21788&id_phuong_xa=undefined&id_so=null&id_bo_nganh=-1",
                iconSrc: Idprocedures,
            },
            {
                key: "2.000635",
                label: "Cấp bản sao Trích lục hộ tịch, bản sao Giấy khai sinh",
                link: "https://dichvucong.gov.vn/p/home/dvc-danh-sach-dich-vu-cong.html?tu_khoa=&bo_nganh=&tinh_thanh=T%E1%BB%89nh%20%C4%90%E1%BB%93ng%20Nai&so=&quan_huyen=Ph%C6%B0%E1%BB%9Dng%20Ph%C6%B0%E1%BB%9Bc%20B%C3%ACnh&phuong_xa=&ma_tt=2.000635&id_tinh_thanh=13459&id_quan_huyen=21788&id_phuong_xa=undefined&id_so=null&id_bo_nganh=-1",
                iconSrc: Idprocedures,
            },
            {
                key: "1.004859",
                label: "Thủ tục thay đổi, cải chính, bổ sung thông tin hộ tịch, xác định lại dân tộc",
                link: "https://dichvucong.gov.vn/p/home/dvc-danh-sach-dich-vu-cong.html?tu_khoa=&bo_nganh=&tinh_thanh=T%E1%BB%89nh%20%C4%90%E1%BB%93ng%20Nai&so=&quan_huyen=Ph%C6%B0%E1%BB%9Dng%20Ph%C6%B0%E1%BB%9Bc%20B%C3%ACnh&phuong_xa=&ma_tt=1.004859&id_tinh_thanh=13459&id_quan_huyen=21788&id_phuong_xa=undefined&id_so=null&id_bo_nganh=-1",
                iconSrc: Idprocedures,
            },
            {
                key: "2.000986",
                label: "Đăng ký khai sinh, đăng ký thường trú, cấp thẻ bảo hiểm y tế cho trẻ em dưới 6 tuổi",
                link: "https://dichvucong.gov.vn/p/home/dvc-danh-sach-dich-vu-cong.html?tu_khoa=&bo_nganh=&tinh_thanh=T%E1%BB%89nh%20%C4%90%E1%BB%93ng%20Nai&so=&quan_huyen=Ph%C6%B0%E1%BB%9Dng%20Ph%C6%B0%E1%BB%9Bc%20B%C3%ACnh&phuong_xa=&ma_tt=2.000986&id_tinh_thanh=13459&id_quan_huyen=21788&id_phuong_xa=undefined&id_so=null&id_bo_nganh=-1",
                iconSrc: Idprocedures,
            },
            {
                key: "2.002622",
                label: "Đăng ký khai tử, xóa đăng ký thường trú, giải quyết mai táng phí, tử tuất",
                link: "https://dichvucong.gov.vn/...",
                iconSrc: Idprocedures,
            },
            {
                key: "1.000656",
                label: "Thủ tục đăng ký khai tử",
                link: "https://dichvucong.gov.vn/p/home/dvc-danh-sach-dich-vu-cong.html?tu_khoa=&bo_nganh=&tinh_thanh=T%E1%BB%89nh%20%C4%90%E1%BB%93ng%20Nai&so=&quan_huyen=Ph%C6%B0%E1%BB%9Dng%20Ph%C6%B0%E1%BB%9Bc%20B%C3%ACnh&phuong_xa=&ma_tt=1.000656&id_tinh_thanh=13459&id_quan_huyen=21788&id_phuong_xa=undefined&id_so=null&id_bo_nganh=-1",
                iconSrc: Idprocedures,
            },
        ],
    },
    {
        key: "thanhlaphoatdongdoanhnghiep",
        title: "Thành lập và hoạt động doanh nghiệp",
        note: "Đăng ký, thay đổi, chấm dứt hoạt động hộ kinh doanh",
        iconSrc: Idprocedures,
        items: [
            {
                key: "1.001612",
                label: "Đăng ký thành lập hộ kinh doanh",
                link: "https://hokinhdoanh.dkkd.gov.vn/HkdOnline/Forms/APP/DW_DOCUMENTEdit.aspx?h=ac",
                iconSrc: Idprocedures,
            },
            {
                key: "1.001266",
                label: "Chấm dứt hoạt động hộ kinh doanh",
                link: "https://hokinhdoanh.dkkd.gov.vn/HkdOnline/Forms/APP/Registration.aspx?h=bb",
                iconSrc: Idprocedures,
            },
            {
                key: "2.000720",
                label: "Đăng ký thay đổi nội dung đăng ký hộ kinh doanh",
                link: "https://hokinhdoanh.dkkd.gov.vn/HkdOnline/Forms/APP/Registration.aspx?h=c2",
                iconSrc: Idprocedures,
            },
        ],
    },
    {
        key: "datdai",
        title: "Đất đai",
        note: "Giao đất, thuê đất, chuyển mục đích",
        iconSrc: Idprocedures,
        items: [
            {
                key: "1.013949",
                label: "Giao đất, cho thuê đất, chuyển mục đích sử dụng đất đối với trường hợp giao đất, cho thuê đất không đấu giá quyền sử dụng đất, không đấu thầu lựa chọn nhà đầu tư thực hiện dự án có sử dụng đất; trường hợp giao đất, cho thuê đất thông qua đấu thầu lựa chọn nhà đầu tư thực hiện dự án có sử dụng đất; giao đất và giao rừng; cho thuê đất và cho thuê rừng, gia hạn sử dụng đất khi hết thời hạn sử dụng đất",
                link: "https://dichvucong.gov.vn/p/home/dvc-danh-sach-dich-vu-cong.html?tu_khoa=&bo_nganh=&tinh_thanh=T%E1%BB%89nh%20%C4%90%E1%BB%93ng%20Nai&so=&quan_huyen=Ph%C6%B0%E1%BB%9Dng%20Ph%C6%B0%E1%BB%9Bc%20B%C3%ACnh&phuong_xa=&ma_tt=1.013949&id_tinh_thanh=13459&id_quan_huyen=21788&id_phuong_xa=undefined&id_so=null&id_bo_nganh=-1",
                iconSrc: Idprocedures,
            },
            {
                key: "1.013978",
                label: "Đăng ký đất đai, tài sản gắn liền với đất, cấp Giấy chứng nhận quyền sử dụng đất, quyền sở hữu tài sản gắn liền với đất lần đầu đối với hộ gia đình, cá nhân, cộng đồng dân cư, người gốc Việt Nam định cư ở nước ngoài",
                link: "https://dichvucong.gov.vn/p/home/dvc-danh-sach-dich-vu-cong.html?tu_khoa=&bo_nganh=&tinh_thanh=T%E1%BB%89nh%20%C4%90%E1%BB%93ng%20Nai&so=&quan_huyen=Ph%C6%B0%E1%BB%9Dng%20Ph%C6%B0%E1%BB%9Bc%20B%C3%ACnh&phuong_xa=&ma_tt=1.013978&id_tinh_thanh=13459&id_quan_huyen=21788&id_phuong_xa=undefined&id_so=null&id_bo_nganh=-1",
                iconSrc: Idprocedures,
            },
            {
                key: "1.013314",
                label: "Xác nhận về điều kiện diện tích bình quân nhà ở để đăng ký thường trú vào chỗ ở do thuê, mượn, ở nhờ; nhà ở, đất ở không có tranh chấp quyền sở hữu nhà ở, quyền sử dụng đất ở, không thuộc địa điểm không được đăng ký thường trú mới",
                link: "https://dichvucong.gov.vn/p/home/dvc-danh-sach-dich-vu-cong.html?tu_khoa=&bo_nganh=&tinh_thanh=T%E1%BB%89nh%20%C4%90%E1%BB%93ng%20Nai&so=&quan_huyen=Ph%C6%B0%E1%BB%9Dng%20Ph%C6%B0%E1%BB%9Bc%20B%C3%ACnh&phuong_xa=&ma_tt=1.013314&id_tinh_thanh=13459&id_quan_huyen=21788&id_phuong_xa=undefined&id_so=null&id_bo_nganh=-1",
                iconSrc: Idprocedures,
            },
        ],
    },
];
