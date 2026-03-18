import React, { FC } from "react";
import { Box } from "zmp-ui";
import styled from "styled-components";
import tw from "twin.macro";
import Logo from "@assets/logo.png";
import TextItemSkeleton from "@components/skeleton/TextSketeton";
import { useStore } from "@store";
import Background from "@assets/header-background.png";

export interface HomeHeaderProps {
    title: string;
    name: string;
}

const HeaderContainer = styled.div`
    ${tw`flex flex-row bg-main text-white items-center fixed top-0 left-0 w-full px-4 h-[calc(48px + var(--zaui-safe-area-inset-top, 0px))]`};
    padding-top: var(--zaui-safe-area-inset-top);
    z-index: 100;
    background: linear-gradient(
            0deg,
            rgba(3, 84, 167, 0.9),
            rgba(4, 109, 214, 0.88)
        ),
        url(${Background});
    background-size: cover;
    background-position: center;
    box-shadow: 0 8px 20px rgba(8, 37, 80, 0.2);
    backdrop-filter: saturate(140%) blur(4px);
    margin: 0 auto;

    @media (min-width: 768px) {
        max-width: 740px;
        left: 50%;
        transform: translateX(-50%);
    }

    @media (max-width: 420px) {
        padding-left: 12px;
        padding-right: 12px;
        height: calc(46px + var(--zaui-safe-area-inset-top, 0px));
    }
`;

const Title = styled.div`
    ${tw`text-base font-bold`}
    letter-spacing: 0.15px;
    line-height: 1.25;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 420px) {
        font-size: 14px;
    }
`;

const LogoWrapper = styled.div`
    width: 32px;
    height: 32px;
    position: relative;
    margin-right: 8px;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    @media (max-width: 420px) {
        width: 28px;
        height: 28px;
        margin-right: 6px;
    }
`;

const StyledText = styled.div`
    ${tw`text-wth_a70 text-xs`}
    min-height: 16px;
    opacity: 0.94;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 420px) {
        font-size: 11px;
    }
`;

const HomeHeader: FC<HomeHeaderProps> = props => {
    const { title, name } = props;
    
    // Lấy thêm organization để kiểm tra xem đã có dữ liệu cũ chưa
    const organization = useStore(state => state.organization);
    const loading = useStore(state => state.gettingOrganization);

    // ✅ TỐI ƯU: Chỉ hiện skeleton khi thực sự không có cả dữ liệu và đang load
    // Nếu đã có organization.name (từ lần load trước), ta hiện luôn name, không hiện skeleton nữa.
    const shouldShowSkeleton = loading && (!organization || !organization.name);

    return (
        <HeaderContainer>
            <LogoWrapper>
                <img src={Logo} alt={title} />
            </LogoWrapper>
            <Box flex flexDirection="column">
                <Title>{title}</Title>
                {shouldShowSkeleton ? (
                    <TextItemSkeleton
                        color="rgba(255,255,255,0.2)"
                        height={16}
                        width={180}
                    />
                ) : (
                    <StyledText>{name || organization?.name}</StyledText>
                )}
            </Box>
        </HeaderContainer>
    );
};

export default HomeHeader;
