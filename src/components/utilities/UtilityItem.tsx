/* eslint-disable react/no-unused-prop-types */
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Text } from "zmp-ui";

import WithItem from "./WithItemClick";

export interface UtinityItemProps {
    label?: string;
    icon?: React.ElementType<any>;
    path?: string;
    onClick?: any;
    inDevelopment?: boolean;
    phoneNumber?: string;
    link?: string;
    handleClickUtinity?: ({
        inDevelopment,
        path,
        phoneNumber,
        link,
    }: {
        inDevelopment?: boolean | undefined;
        path?: string | undefined;
        phoneNumber?: string | undefined;
        link?: string | undefined;
    }) => void;
}

const Wrapper = styled.div`
    ${tw`flex flex-col items-center p-1`};
    width: 100%;
    position: relative;
    z-index: 1;

    @media (max-width: 420px) {
        width: 100%;
    }
`;
const IconWrapper = styled.div`
    ${tw`rounded-2xl bg-icon_bg relative`};
    width: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    border: 1px solid #e8edf5;
    box-shadow: 0 10px 22px rgba(20, 40, 80, 0.08);
    background: linear-gradient(180deg, #ffffff 0%, #f9fbff 100%);
    transition: transform 0.2s ease, box-shadow 0.2s ease,
        background-color 0.2s ease;
    &:active {
        transform: translateY(1px) scale(0.98);
        box-shadow: 0 6px 14px rgba(20, 40, 80, 0.08);
        background: #eef5ff;
    }

    @media (max-width: 420px) {
        height: 86px;
        border-radius: 14px;
    }
`;

const CenterIcon = styled.div`
    ${tw`inline-block `};
`;

const Label = styled(Text)`
    ${tw`text-center`};
    margin-top: 9px;
    color: #1f2937;
    font-weight: 600;
    line-height: 1.35;
    min-height: 36px;

    @media (max-width: 420px) {
        margin-top: 7px;
        min-height: 32px;
        font-size: 11px;
        line-height: 1.3;
    }
`;

const UtinityItem: FunctionComponent<UtinityItemProps> = props => {
    const { icon: Icon, label, handleClickUtinity, onClick } = props;

    const handleClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        event.preventDefault();

        // ✅ ƯU TIÊN onClick (menu con)
        if (onClick) {
            onClick();
            return;
        }

        // ✅ GIỮ NGUYÊN HÀNH VI CŨ
        handleClickUtinity?.(props);
    };


    return (
        <Wrapper onClick={handleClick}>
            {Icon && (
                <IconWrapper>
                    <CenterIcon>
                        <Icon />
                    </CenterIcon>
                </IconWrapper>
            )}
            <Label size="xxSmall">{label}</Label>
        </Wrapper>
    );
};

export default WithItem(UtinityItem);
