import React, { FunctionComponent } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { List, Icon } from "zmp-ui";

import { ImageIcon } from "@components/icons";
import { Utinity } from "@dts";
import WithItemClick from "./WithItemClick";

export interface ItemProps extends Utinity {
    variant?: "default" | "hotline";
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

const StyledListItem = styled(List.Item)`
    ${tw`px-0 py-2 rounded-2xl`}
    border: 1px solid #e5edf7;
    background: linear-gradient(180deg, #ffffff 0%, #f9fbff 100%);
    box-shadow: 0 6px 14px rgba(17, 44, 86, 0.05);
    margin-bottom: 8px;

    &:active {
        background: #edf5ff;
    }

    .zaui-list-item-content {
        display: flex;
        align-items: center;
        padding: 10px 12px;
        overflow: hidden;
    }

    .zaui-list-item-prefix {
        margin-right: 12px;
        display: flex;
        align-items: center;
        flex-shrink: 0;
    }

    .zaui-list-item-main {
        flex: 1;
        min-width: 0;
    }

    .zaui-list-item-title {
        white-space: normal;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-word;
    }

    .zaui-list-item-suffix {
        margin-left: auto;
        display: flex;
        align-items: center;
    }

    @media (max-width: 420px) {
        .zaui-list-item-content {
            padding: 9px 10px;
        }

        .zaui-list-item-prefix {
            margin-right: 10px;
        }

        .zaui-list-item-title {
            -webkit-line-clamp: 3;
        }
    }
`;

const HotlineListItem = styled(List.Item)`
    ${tw`px-0 py-0`};
    border-bottom: 1px solid #e5e7eb;

    &:last-child {
        border-bottom: none;
    }

    &:active {
        background: #edf5ff;
    }

    .zaui-list-item-content {
        display: flex;
        align-items: center;
        padding: 12px 12px 12px 16px;
    }

    .zaui-list-item-prefix {
        width: 36px;
        height: 36px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(180deg, #f5f8fd 0%, #edf3fb 100%);
        border: 1px solid #e3ebf5;
        margin: 8px 0 6px 12px;
        flex-shrink: 0;
    }

    .zaui-list-item-main {
        flex: 1;
        min-width: 0;
        padding-right: 6px;
        display: flex;
        align-items: center;
    }

    .zaui-list-item-title {
        color: #111827;
        font-size: 14px;
        font-weight: 500;
        line-height: 1.35;
        margin: 0;
        white-space: normal;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-word;
    }

    .zaui-list-item-suffix {
        margin-left: 10px;
        margin-right: 12px;
        display: flex;
        align-items: center;
        flex-shrink: 0;
    }

    @media (max-width: 420px) {
        .zaui-list-item-content {
            padding: 10px 0 10px 12px;
        }

        .zaui-list-item-prefix {
            width: 32px;
            height: 32px;
            margin-right: 10px;
        }

        .zaui-list-item-title {
            font-size: 13px;
            line-height: 1.35;
            -webkit-line-clamp: 3;
        }

        .zaui-list-item-suffix {
            margin-left: 8px;
            margin-right: 12px;
        }
    }
`;

const HotlineIcon = styled.img`
    width: 18px;
    height: 18px;
    object-fit: contain;
    display: block;

    @media (max-width: 420px) {
        width: 16px;
        height: 16px;
    }
`;

const CallButton = styled.button`
    ${tw`inline-flex items-center`};
    gap: 4px;
    border-radius: 999px;
    border: 1px solid #d6e8ff;
    background: #f2f8ff;
    color: #0f4a8a;
    font-size: 12px;
    font-weight: 500;
    padding: 6px 10px;
    line-height: 1;
    min-height: 30px;
    margin-right: 0;
    white-space: nowrap;
    cursor: pointer;
    transition: background-color 0.2s ease, border-color 0.2s ease;

    &:active {
        background: #e3f0ff;
        border-color: #c4dcff;
    }

    @media (max-width: 420px) {
        min-height: 28px;
        padding: 5px 9px;
        font-size: 11px;
        gap: 3px;
    }

    @media (max-width: 360px) {
        min-width: 30px;
        padding: 5px 8px;

        .call-label {
            display: none;
        }
    }
`;

const UtinityItem: FunctionComponent<ItemProps> = props => {
    const { iconSrc, label, variant, handleClickUtinity } = props;

    const handleClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        event.preventDefault();
        handleClickUtinity?.(props);
    };

    if (variant === "hotline") {
        const handleCallButton = (
            event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        ) => {
            event.preventDefault();
            event.stopPropagation();
            handleClickUtinity?.(props);
        };

        return (
            <HotlineListItem
                onClick={handleClick}
                prefix={<HotlineIcon src={iconSrc} alt="" />}
                suffix={(
                    <CallButton
                        type="button"
                        onClick={handleCallButton}
                        aria-label={`Gọi ${label}`}
                    >
                        <Icon icon="zi-call" size={14} />
                    </CallButton>
                )}
                title={label}
            />
        );
    }

    return (
        <StyledListItem
            onClick={handleClick}
            prefix={<ImageIcon src={iconSrc} />}
            suffix={<Icon icon="zi-chevron-right" className="text-slate-300" />}
            title={label}
        />
    );
};

export default WithItemClick(UtinityItem);
