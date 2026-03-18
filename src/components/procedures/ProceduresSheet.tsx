import React from "react";
import { Sheet, Text, Icon, Box } from "zmp-ui";
import styled from "styled-components";
import tw from "twin.macro";
import { ProcedureGroup } from "./Procedures.data";
import { openProcedureLink } from "./Procedures.logic";

/* ===== STYLE ===== */
const Header = styled.div`
    ${tw`relative flex items-center justify-center py-4`};
    border-bottom: 1px solid #dbe7f7;
    border-radius: 16px 16px 0 0;
    background: linear-gradient(180deg, #ffffff 0%, #f5f9ff 100%);
`;

const ListContainer = styled.div`
    ${tw`px-4 py-4`};
    max-height: 70vh;
    overflow-y: auto;
    background: #eef7ff;
`;

const ProcedureItem = styled.div`
    ${tw`bg-white rounded-xl px-4 py-3.5 mb-2 flex items-center justify-between shadow-sm transition-colors`};
    border: 1px solid #dbeafc;
    cursor: pointer;
    box-shadow: 0 8px 18px rgba(17, 72, 138, 0.08);
    &:active {
        background: #edf5ff;
    }
`;

const IconWrapper = styled.div`
    ${tw`flex-shrink-0 text-blue-600 flex items-center justify-center ml-2`};
`;

/* ===== COMPONENT ===== */

interface Props {
    visible: boolean;
    group: ProcedureGroup | null;
    onClose: () => void;
}

const ProceduresSheet: React.FC<Props> = ({
    visible,
    group,
    onClose,
}) => {

    // ✅ Hàm xử lý mở trang chi tiết thủ tục
    const handleOpenProcedure = (url: string) => {
        // NOTE: Đóng sheet trước khi mở webview để tránh trạng thái nền bị giữ ở sheet.
        onClose();
        openProcedureLink(url).catch(() => undefined);
    };

    return (
        <Sheet
            visible={visible}
            onClose={onClose}
            mask
            autoHeight
            handler
            swipeToClose
        >
            <Header>
                <Text 
                    size="normal" 
                    className="text-blue-600 text-center line-clamp-1 font-black uppercase tracking-tighter"
                    style={{ fontWeight: 600 }}
                >
                    {group?.title || "Danh sách thủ tục"}
                </Text>
            </Header>

            <ListContainer>
                {group?.items.map(item => (
                    <ProcedureItem
                        key={item.key}
                        onClick={() => handleOpenProcedure(item.link)}
                    >
                        <Box flex alignItems="flex-start" className="w-full">
                            <Box 
                                className="flex-shrink-0 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600"
                                style={{ width: "32px", height: "32px", marginTop: "1px" }} 
                            >
                                <Icon icon="zi-note" size={18} />
                            </Box>
                            
                            <Box ml={3} flex flexDirection="column">
                                <Text 
                                    className="text-gray-400 uppercase font-bold tracking-widest mb-0.5" 
                                    style={{ fontSize: "10px", lineHeight: "1.2" }}
                                >
                                    Thủ tục hành chính
                                </Text>
                                
                                <Text 
                                    size="small" 
                                    className="text-gray-700 font-semibold leading-snug pr-2"
                                >
                                    {item.label}
                                </Text>
                            </Box>
                        </Box>
                        
                        <IconWrapper>
                            <Icon icon="zi-chevron-right" size={18} className="text-gray-300" />
                        </IconWrapper>
                    </ProcedureItem>
                ))}
                
                <div className="h-6" />
            </ListContainer>
        </Sheet>
    );
};

export default ProceduresSheet;
