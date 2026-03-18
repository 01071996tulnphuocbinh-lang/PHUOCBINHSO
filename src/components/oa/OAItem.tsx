import React, { FC } from "react";
import styled from "styled-components";
import { Box, Button, Icon, Text, Avatar } from "zmp-ui";
import tw from "twin.macro";
import { requestFollowOA } from "@components/api/zalo";
import { useOAActions } from "presentation/hooks/useOAActions";

export interface OAInfo {
    oaId: string;
    name: string;
    avatar?: string;
    description?: string;
}

interface OAItemProps {
    officialAccount: OAInfo;
}

const ItemWrapper = styled(Box)`
    ${tw`flex flex-row items-start px-3 py-3 mb-2 rounded-2xl`};
    border: 1px solid #e5edf7;
    box-shadow: 0 6px 14px rgba(17, 44, 86, 0.05);
    background: linear-gradient(180deg, #ffffff 0%, #f9fbff 100%);
    &:active {
        background: #edf5ff;
    }
`;

const StyledChatButton = styled(Button)`
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: center !important;
    white-space: nowrap;
    padding: 0 10px !important;
    height: 34px !important;
    gap: 4px;
    min-width: 0 !important;
    flex: 1 !important;
    border-radius: 9999px !important;
    border: 1px solid #1f6ddf !important;
    background: linear-gradient(135deg, #1f6ddf 0%, #3496ff 100%) !important;
    color: #ffffff !important;
`;

const StyledFollowButton = styled(Button)`
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: center !important;
    white-space: nowrap;
    padding: 0 10px !important;
    height: 34px !important;
    gap: 4px;
    min-width: 0 !important;
    flex: 1 !important;
    border-radius: 9999px !important;
    border: 1px solid #cfe0f6 !important;
    background: linear-gradient(180deg, #f8fbff 0%, #eff5ff 100%) !important;
    color: #1f4f9c !important;
`;

const OAItem: FC<OAItemProps> = ({ officialAccount }) => {
    const { oaId, name, avatar, description } = officialAccount;
    const { openChat } = useOAActions();
    const defaultAvatar =
        "https://stc-zaloprofile.zdn.vn/pc/v1/images/oa_default.png";

    const handleOpenChat = () => {
        openChat(oaId).catch(() => undefined);
    };

    const handleFollowOA = async () => {
        await requestFollowOA(oaId).catch(() => undefined);
    };

    return (
        <ItemWrapper>
            <Box
                flex
                flexDirection="row"
                alignItems="flex-start"
                style={{ flex: 1, minWidth: 0 }}
            >
                <Avatar src={avatar || defaultAvatar} size={44} />
                <Box ml={3} style={{ flex: 1, minWidth: 0 }}>
                    <Text
                        bold
                        size="small"
                        style={{ lineHeight: "20px" }}
                        className="truncate"
                    >
                        {name}
                    </Text>
                    <Text
                        size="xSmall"
                        className="text-gray-500 truncate"
                        style={{ lineHeight: "16px" }}
                    >
                        {description || "Cơ quan nhà nước"}
                    </Text>
                    <Box mt={2} flex style={{ gap: "8px", width: "100%" }}>
                        <StyledFollowButton
                            size="small"
                            variant="tertiary"
                            prefixIcon={(
                                <Icon
                                    icon="zi-add-user-solid"
                                    style={{ fontSize: "16px", display: "flex" }}
                                />
                            )}
                            onClick={handleFollowOA}
                        >
                            Quan tâm OA
                        </StyledFollowButton>
                        <StyledChatButton
                            size="small"
                            variant="tertiary"
                            prefixIcon={(
                                <Icon
                                    icon="zi-chat"
                                    style={{ fontSize: "16px", display: "flex" }}
                                />
                            )}
                            onClick={handleOpenChat}
                        >
                            Nhắn tin
                        </StyledChatButton>
                    </Box>
                </Box>
            </Box>
        </ItemWrapper>
    );
};

export default OAItem;
