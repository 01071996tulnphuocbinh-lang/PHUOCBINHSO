import React, { FC } from "react";
import styled from "styled-components";
import { Box, List, Text } from "zmp-ui";
import tw from "twin.macro";
import { OAItemSkeleton } from "@components/skeleton";
import { useStore } from "@store";
import OAItem from "./OAItem";

// --- Styled Components ---
const ListWrapper = styled(Box)`
    ${tw`bg-white mt-3 p-4`};
    border: 1px solid #e7edf5;
    border-radius: 18px;
    box-shadow: 0 6px 16px rgba(21, 48, 92, 0.06);

    @media (max-width: 420px) {
        padding: 12px;
        border-radius: 14px;
    }
`;

const SubTitle = styled(Text)`
    ${tw`text-text_2`}
    color: #64748b;
    margin-top: 2px;
`;

const ListOAStyled = styled(List)`
    padding: 6px 0 0;
    margin-top: 12px;
`;

// --- Main ListOA ---
const ListOA: FC = () => {
    const officialAccounts = useStore(state => state.organization?.officialAccounts) || [];
    const loading = useStore(state => state.gettingOrganization);

    if (!loading && officialAccounts.length === 0) {
        return null;
    }

    return (
        <ListWrapper mt={2} p={4}>
            <Text.Title size="small">Danh sách OA</Text.Title>
            <SubTitle size="small">OA chính thức của cơ quan nhà nước</SubTitle>

            <ListOAStyled>
                {loading ? (
                    <>
                        <OAItemSkeleton />
                        <OAItemSkeleton />
                        <OAItemSkeleton />
                    </>
                ) : (
                    officialAccounts.map((item: any) => (
                        <OAItem key={item.oaId} officialAccount={item} />
                    ))
                )}
            </ListOAStyled>
        </ListWrapper>
    );
};

export default ListOA;
