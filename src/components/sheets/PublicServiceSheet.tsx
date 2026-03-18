import React, { useMemo } from "react";
import { Sheet, Text, Icon, Box } from "zmp-ui";
import styled from "styled-components";
import tw from "twin.macro";
import { openExternalWebView } from "presentation/services/external-actions.service";
import { PublicServiceSheetProps } from "./PublicServiceSheet.data";
import { getPublicServiceSection } from "./PublicServiceSheet.logic";

/* ... (Giữ nguyên phần Styled Components bên trên của bạn) ... */

const StyledSheet = styled(Sheet)`
  .zmp-sheet-content {
    border-radius: 24px 24px 0 0;
    overflow: hidden;
    background: linear-gradient(180deg, #eef7ff 0%, #ffffff 48%);
    box-shadow: 0 -16px 30px rgba(10, 32, 70, 0.12);
  }
`;

const Header = styled.div`
  ${tw`flex items-center justify-center px-4 py-5`};
  border-bottom: 1px solid #dbe7f7;
  background: linear-gradient(180deg, #ffffff 0%, #f5f9ff 100%);
`;

const Wrapper = styled.div`
  ${tw`px-4 pt-4 pb-0`};
  max-height: 75vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: #eef7ff;
`;

const Item = styled.div`
  ${tw`flex items-center bg-white rounded-2xl px-4 py-4 mb-2 shadow-sm active:scale-[0.985] transition-all duration-200`};
  border: 1px solid #dbeafc;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(17, 72, 138, 0.08);
  &:active {
    background: #edf5ff;
    box-shadow: 0 4px 10px rgba(17, 44, 86, 0.06);
  }
`;

const IconBox = styled.div`
  ${tw`mr-4 flex items-center justify-center rounded-2xl flex-shrink-0 bg-blue-100 text-blue-700`};
  width: 52px;
  height: 52px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
`;

const Content = styled.div`
  ${tw`flex flex-col flex-1 pr-2 min-w-0`};
`;

/* ======================
    COMPONENT
====================== */
const PublicServiceSheet: React.FC<PublicServiceSheetProps> = ({
  visible,
  type,
  onClose,
}) => {
  const data = useMemo(() => getPublicServiceSection(type), [type]);

  // ✅ XỬ LÝ MỞ WEB KHI BẤM VÀO ITEM
const handleItemClick = (url: string) => {
    // NOTE: Đóng sheet trước để khi bấm "X" từ browser, người dùng thấy Home ngay lập tức.
    onClose();
    openExternalWebView(url).catch(() => undefined);
  };

  return (
    <StyledSheet
      visible={visible}
      onClose={onClose}
      mask
      autoHeight
      handler 
      swipeToClose
    >
      <Header>
        <Text
          className="text-blue-600 font-black uppercase tracking-tight"
          style={{ fontWeight: 600, fontSize: "20px" }}
        >
          {data.title}
        </Text>
      </Header>

      <Wrapper>
        {data.items.map((item) => (
          <Item key={item.key} onClick={() => handleItemClick(item.link)}>
            <IconBox>
              <item.icon size={30} />
            </IconBox>

            <Content>
              <Text 
                className="text-gray-800 font-extrabold leading-tight mb-1"
                style={{ fontSize: "16px" }}
              >
                {item.label}
              </Text>
              <Text 
                className="text-gray-500 font-medium leading-snug"
                style={{ fontSize: "12px" }}
              >
                {item.note}
              </Text>
            </Content>

            <Box className="flex-shrink-0 text-gray-300 ml-2">
              <Icon icon="zi-chevron-right" size={22} />
            </Box>
          </Item>
        ))}
      </Wrapper>
    </StyledSheet>
  );
};

export default PublicServiceSheet;
