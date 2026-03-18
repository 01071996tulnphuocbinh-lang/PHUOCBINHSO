import React, { FunctionComponent } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Utinity } from "@dts";
import { Box, List, Text } from "zmp-ui";
import Item from "./VerticalListItem";

interface VerticalListPorps {
    utinities: Utinity[];
    title?: string;
    subtitle?: string;
    titleVariant?: "default" | "hotline";
}

const Wrapper = styled.div`
    ${tw`bg-white mt-3`};
    padding: 16px;
    border: 1px solid #e7edf5;
    border-radius: 18px;
    box-shadow: 0 6px 16px rgba(21, 48, 92, 0.06);

    @media (max-width: 420px) {
        padding: 12px;
        border-radius: 14px;
    }
`;

const Header = styled(Box)`
    ${tw`mb-4`};

    @media (max-width: 420px) {
        margin-bottom: 12px;
    }
`;

const HeaderBadge = styled.span<{ $variant: "default" | "hotline" }>`
    ${tw`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full mb-2`};
    ${({ $variant }) =>
        $variant === "hotline"
            ? `
        color: #b42318;
        background: #ffefef;
        border: 1px solid #ffd4d4;
    `
            : `
        color: #1d4ed8;
        background: #edf5ff;
        border: 1px solid #dbeafe;
    `}
`;

const HeaderTitle = styled(Text.Title)`
    color: #0f172a;

    @media (max-width: 420px) {
        font-size: 16px;
    }
`;

const HeaderSubTitle = styled(Text)`
    ${tw`text-xs`};
    color: #64748b;
    margin-top: 2px;
`;

const HotlineWrapper = styled.div`
    ${tw`bg-white mt-3`};
    border: 1px solid #e7edf5;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 6px 16px rgba(21, 48, 92, 0.06);

    @media (max-width: 420px) {
        border-radius: 14px;
    }
`;

const HotlineHeader = styled.div`
    ${tw`px-4 py-3 border-b border-gray-200`};
    background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);

    @media (max-width: 420px) {
        padding: 10px 12px;
    }
`;

const HotlineHeaderTitle = styled(Text)`
    font-weight: 600;
    line-height: 1.35;
`;

const HotlineHeaderSubTitle = styled(Text)`
    ${tw`text-xs`};
    color: #64748b;
    margin-top: 2px;
    line-height: 1.4;
`;

const VerticalList: FunctionComponent<VerticalListPorps> = props => {
    const {
        utinities,
        title,
        subtitle,
        titleVariant = "default",
    } = props;

    if (titleVariant === "hotline") {
        return (
            <HotlineWrapper>
                <HotlineHeader>
                    <HotlineHeaderTitle size="small">
                        {title}
                    </HotlineHeaderTitle>
                    <HotlineHeaderSubTitle>
                        Chạm vào dòng hoặc nút gọi để liên hệ nhanh
                    </HotlineHeaderSubTitle>
                </HotlineHeader>
                <List noSpacing divider={false}>
                    {utinities.map(item => {
                        const { key, ...utinity } = item;
                        return (
                            <Item
                                key={key}
                                {...utinity}
                                variant="hotline"
                            />
                        );
                    })}
                </List>
            </HotlineWrapper>
        );
    }

    return (
        <Wrapper>
            <Header>
                {titleVariant === "default" && (
                    <HeaderBadge $variant={titleVariant}>Danh mục</HeaderBadge>
                )}
                <HeaderTitle size="small">{title}</HeaderTitle>
                {subtitle && <HeaderSubTitle>{subtitle}</HeaderSubTitle>}
            </Header>
            <List noSpacing divider={false}>
                {utinities.map(item => {
                    const { key, ...utinity } = item;
                    return <Item key={key} {...utinity} />;
                })}
            </List>
        </Wrapper>
    );
};

export default VerticalList;
