import React, { useState } from "react";
import { Text, Icon } from "zmp-ui";
import styled from "styled-components";
import tw from "twin.macro";
import ProceduresSheet from "./ProceduresSheet";
import { PROCEDURE_GROUPS, ProcedureGroup } from "./Procedures.data";

const Wrapper = styled.div`
    ${tw`bg-white mt-3`};
    border: 1px solid #e7edf5;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 6px 16px rgba(21, 48, 92, 0.06);

    @media (max-width: 420px) {
        border-radius: 14px;
    }
`;

const SectionTitle = styled.div`
    ${tw`px-4 py-3 border-b border-gray-200`};
    background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);

    @media (max-width: 420px) {
        padding: 10px 12px;
    }
`;

const SubTitle = styled(Text)`
    ${tw`text-xs`};
    color: #64748b;
    margin-top: 2px;
    line-height: 1.4;
`;

const Row = styled.div`
    ${tw`flex items-start px-4 py-3 border-b border-gray-200`};
    transition: background-color 0.2s ease;
    &:active {
        background: #edf5ff;
    }

    @media (max-width: 420px) {
        padding: 10px 12px;
    }
`;

const IconBox = styled.div`
    ${tw`mr-3 flex items-center justify-center rounded-md`};
    width: 36px;
    height: 36px;
    background: linear-gradient(180deg, #f5f8fd 0%, #edf3fb 100%);
    border: 1px solid #e3ebf5;

    @media (max-width: 420px) {
        width: 32px;
        height: 32px;
        margin-right: 10px;
    }
`;

const Content = styled.div`
    ${tw`flex-1`};
`;

const Title = styled.div`
    ${tw`text-sm font-medium text-gray-900`};
    line-height: 1.35;

    @media (max-width: 420px) {
        font-size: 13px;
    }
`;

const Note = styled.div`
    ${tw`text-xs text-gray-500 mt-0.5`};
    line-height: 1.4;

    @media (max-width: 420px) {
        font-size: 11px;
    }
`;

const Arrow = styled.div`
    ${tw`ml-2 text-gray-400 mt-1`};
`;

const Procedures: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [activeGroup, setActiveGroup] = useState<ProcedureGroup | null>(null);

    const handleOpen = (group: ProcedureGroup) => {
        setActiveGroup(group);
        setVisible(true);
    };

    const handleClose = () => {
        setVisible(false);
        setActiveGroup(null);
    };

    return (
        <>
            <Wrapper>
                <SectionTitle>
                    <Text size="small" style={{ fontWeight: 600 }}>
                        Lĩnh vực giải quyết nổi bật
                    </Text>
                    <SubTitle>
                        Chọn lĩnh vực để xem danh sách thủ tục chi tiết
                    </SubTitle>
                </SectionTitle>

                {PROCEDURE_GROUPS.map(group => (
                    <Row key={group.key} onClick={() => handleOpen(group)}>
                        <IconBox>
                            <img src={group.iconSrc} width={18} alt="" />
                        </IconBox>

                        <Content>
                            <Title>{group.title}</Title>
                            {group.note && <Note>{group.note}</Note>}
                        </Content>

                        <Arrow>
                            <Icon icon="zi-chevron-right" size={16} />
                        </Arrow>
                    </Row>
                ))}
            </Wrapper>

            <ProceduresSheet
                visible={visible}
                group={activeGroup}
                onClose={handleClose}
            />
        </>
    );
};

export default Procedures;
