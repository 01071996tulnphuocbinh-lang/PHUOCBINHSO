import React, { FunctionComponent } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Background from "@assets/background.png";
import UtinityItem, { UtinityItemProps } from "./UtilityItem";

interface UtinitiesProps {
    utinities: UtinityItemProps & { key: string }[];
}

const UtinitiesWrapper = styled.div`
    ${tw`grid grid-cols-2 bg-center bg-no-repeat`};
    gap: 12px;
    background-image: url(${Background});
    background-size: cover;
    border-radius: 0 0 24px 24px;
    padding: 18px 16px 14px;
    position: relative;
    overflow: hidden;
    &:before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0.65)
        );
        pointer-events: none;
    }

    @media (max-width: 420px) {
        border-radius: 0 0 20px 20px;
        padding: 14px 12px 10px;
        gap: 8px;
    }
`;
const Utinities: FunctionComponent<UtinitiesProps> = props => {
    const { utinities } = props;
    return (
        <UtinitiesWrapper>
            {utinities.map(item => {
                const { key, ...utinity } = item;
                return <UtinityItem key={key} {...utinity} />;
            })}
        </UtinitiesWrapper>
    );
};

export default Utinities;
