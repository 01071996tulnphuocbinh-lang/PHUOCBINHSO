import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Icon } from "zmp-ui";

const Wrapper = styled.div`
  ${tw`bg-white mt-3 p-4`};
  border: 1px solid #e7edf5;
  border-radius: 18px;
  box-shadow: 0 6px 16px rgba(21, 48, 92, 0.06);

  @media (max-width: 420px) {
    padding: 12px;
    border-radius: 14px;
  }
`;

const FooterTitle = styled.div`
  ${tw`font-semibold text-sm mb-3 flex items-center gap-2`};
  color: #0f172a;
  line-height: 1;

  @media (max-width: 420px) {
    font-size: 13px;
    margin-bottom: 10px;
  }
`;

const FooterInfo = styled.div`
  ${tw`text-xs mb-2 flex items-start gap-2`};
  color: #4b5563;
  line-height: 1.4;

  @media (max-width: 420px) {
    margin-bottom: 6px;
    line-height: 1.45;
  }
`;

const IconBox = styled.div`
  ${tw`flex-shrink-0 text-blue-600`};
  display: flex;
  align-items: center;
  margin-top: 1px;
`;

const Footer: React.FC = () => (
    <Wrapper>
      <FooterTitle>
        <IconBox>
          <Icon icon="zi-home" size={18} />
        </IconBox>
        <span style={{ transform: "translateY(1px)" }}>UBND PHƯỜNG PHƯỚC BÌNH</span>
      </FooterTitle>

      <FooterInfo>
        <IconBox>
          <Icon icon="zi-location" size={16} />
        </IconBox>
        <span>Khu phố 5, phường Phước Bình, tỉnh Đồng Nai</span>
      </FooterInfo>

      <FooterInfo>
        <IconBox>
          <Icon icon="zi-call" size={16} />
        </IconBox>
        <span>02713.778750</span>
      </FooterInfo>

      <FooterInfo className="mb-0">
        <IconBox>
          <Icon icon="zi-link" size={16} />
        </IconBox>
        <span>phuocbinh.dongnai.gov.vn</span>
      </FooterInfo>

      <div style={{ 
        marginTop: '16px', 
        paddingTop: '12px', 
        borderTop: '1px dashed #e2e8f0',
        textAlign: 'center', 
        fontSize: '10px', 
        color: '#94a3b8',
        lineHeight: '1.4'
      }}>
        © 2026 Trung tâm Phục vụ hành chính công phường Phước Bình
      </div>
    </Wrapper>
);

export default Footer;
