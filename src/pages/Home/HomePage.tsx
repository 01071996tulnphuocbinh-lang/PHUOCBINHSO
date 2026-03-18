import React, { useState, useCallback, useMemo } from "react";
import {
    HomeHeader,
    Utinities,
    ListOA,
    AssessmentSheet,
    Procedures,
    PublicServiceSheet,
} from "@components";
import PageLayout from "@components/layout/PageLayout";
import { APP_UTINITIES } from "@constants/utinities";
import Footer from "@components/layout/Footer";
import OAConnector from "@components/oa/OAConnector";
import { Box } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { openExternalWebView } from "presentation/services/external-actions.service";
import Contacts from "./Contacts";

type SheetType = "public" | "payment" | "grievance" | "assessment";

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const [sheetVisible, setSheetVisible] = useState(false);
    const [sheetType, setSheetType] = useState<SheetType>("public");
    const [assessmentVisible, setAssessmentVisible] = useState(false);

    // ✅ Tối ưu 1: Dùng useCallback để hàm không bị tạo lại
    const handleOpenExternalWeb = useCallback((url?: string) => {
        if (!url) return;
        // NOTE: Mở webview trực tiếp tại Home, không dùng màn hình trung gian.
        openExternalWebView(url).catch(() => undefined);
    }, []);

    const openSheet = useCallback((type: SheetType) => {
        if (type === "grievance") {
            navigate("/grievance"); 
        } else if (type === "assessment") {
            setAssessmentVisible(true);
        } else {
            setSheetType(type);
            setSheetVisible(true);
        }
    }, [navigate]);

    // ✅ Tối ưu 2: Dùng useMemo để "đóng băng" danh sách Utilities
    // Header sẽ không bị ảnh hưởng bởi logic xử lý nút bấm khi quay lại
    const memoizedUtilities = useMemo(
        () =>
            APP_UTINITIES.map(item => {
                if (item.key === "Webportal" || item.key === "file-search") {
                    // NOTE: Ép hai tiện ích này mở web trực tiếp để tránh nháy header khi quay lại.
                    return { ...item, onClick: () => handleOpenExternalWeb(item.link) };
                }
                if (item.key === "goverment") return { ...item, onClick: () => openSheet("public") };
                if (item.key === "onlinepayment") return { ...item, onClick: () => openSheet("payment") };
                if (item.key === "report") return { ...item, onClick: () => openSheet("grievance") };
                if (item.key === "assessment") return { ...item, onClick: () => openSheet("assessment") };
                return item;
            }),
        [handleOpenExternalWeb, openSheet],
    );

    return (
        <PageLayout
            id="home-page"
            customHeader={
                <HomeHeader
                    title="TTPVHCC PHƯỜNG PHƯỚC BÌNH"
                    // ✅ Dùng dữ liệu cũ nếu chưa kịp load xong để tránh nháy chữ
                    name="Hành chính phục vụ"
                />
            }
        >
            <Box className="bg-[#eef7ff] pb-4">
                {/* Sử dụng danh sách đã ghi nhớ */}
                <Utinities utinities={memoizedUtilities} />
                <OAConnector />
            </Box>

            <Box className="px-4 pb-4 bg-[#eef7ff]">
                <ListOA />
                <Contacts />
                <Procedures />
                <Footer />
            </Box>

            <PublicServiceSheet
                visible={sheetVisible}
                type={sheetType as any}
                onClose={() => setSheetVisible(false)}
            />

            <AssessmentSheet 
                visible={assessmentVisible} 
                onClose={() => setAssessmentVisible(false)} 
            />
        </PageLayout>
    );
};

export default HomePage;
