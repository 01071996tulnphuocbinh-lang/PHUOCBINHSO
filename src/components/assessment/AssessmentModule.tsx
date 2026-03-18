import React, { useState } from "react";
import { Box, Text, Input, Button, Sheet, useSnackbar, Icon, Select } from "zmp-ui";
import styled from "styled-components";
import tw from "twin.macro";
import {
  ASSESSMENT_SCRIPT_URL,
  AssessmentSheetProps,
  OFFICER_OPTIONS,
  RATING_LEVELS,
} from "./AssessmentModule.data";
import { submitAssessment } from "./AssessmentModule.logic";

const { Option } = Select;

/* ===== STYLED COMPONENTS: TỐI ƯU 100% GIAO DIỆN APP ===== */
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

  @media (max-width: 420px) {
    padding: 14px 12px;
  }
`;

const Wrapper = styled.div`
  ${tw`px-4 pt-4`};
  padding-bottom: calc(4px + env(safe-area-inset-bottom));
  max-height: 78vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: linear-gradient(180deg, #eef7ff 0%, #f7fbff 70%, #ffffff 100%);

  @media (max-width: 420px) {
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 12px;
    max-height: 82vh;
  }
`;

const ContentStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 420px) {
    gap: 10px;
  }
`;

const SectionCard = styled(Box)`
  ${tw`rounded-2xl bg-white`};
  border: 1px solid #d7e6fa;
  box-shadow: 0 8px 16px rgba(17, 72, 138, 0.08);
`;

const StarContainer = styled(Box)`
  ${tw`flex items-center justify-center gap-4 py-4 rounded-xl mt-2`};
  border: 1px solid #d7e6fa;
  background: linear-gradient(180deg, #f5faff 0%, #edf5ff 100%);

  @media (max-width: 420px) {
    gap: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
`;

const StyledTextArea = styled(Input.TextArea)`
  ${tw`border-none rounded-2xl p-4 mt-1.5 transition-all focus:bg-white focus:ring-1 focus:ring-blue-100`};
  background: linear-gradient(180deg, #f3f9ff 0%, #ffffff 100%);
  & textarea { ${tw`bg-transparent text-base text-gray-800`}; min-height: 100px; }

  @media (max-width: 420px) {
    padding: 12px;
    border-radius: 14px;
    & textarea {
      min-height: 86px;
      font-size: 15px;
    }
  }
`;

const RatingLabel = styled(Text)`
  ${tw`text-center font-black text-blue-800 mt-3 uppercase tracking-widest`};
  font-size: 13px; /* Tăng kích thước nhãn đánh giá */

  @media (max-width: 420px) {
    margin-top: 10px;
    font-size: 12px;
  }
`;

const HeaderTitle = styled(Text)`
  ${tw`text-black font-black tracking-tight`};
  font-weight: 600;
  font-size: 20px;

  @media (max-width: 420px) {
    font-size: 18px;
  }
`;

/* ===== COMPONENT CHÍNH ===== */
const OfficerRatingSheet: React.FC<AssessmentSheetProps> = ({ visible, onClose }) => {
  const [officerName, setOfficerName] = useState("");
  const [officerSelectKey, setOfficerSelectKey] = useState(0);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { openSnackbar } = useSnackbar();

  const ratingTexts = RATING_LEVELS.map(item => item.text);
  const currentRatingColor = RATING_LEVELS[rating - 1].color;
  const resetOfficerSelect = () => {
    setOfficerName("");
    setOfficerSelectKey(prev => prev + 1);
  };

  const handleSheetClose = () => {
    resetOfficerSelect();
    onClose();
  };

  const handleSubmit = async () => {
    if (!officerName) {
      openSnackbar({ text: "Vui lòng chọn cán bộ", type: "error" });
      return;
    }

    setLoading(true);
    try {
      await submitAssessment({
        scriptUrl: ASSESSMENT_SCRIPT_URL,
        officerName,
        rating,
        ratingText: RATING_LEVELS[rating - 1].text,
        comment,
      });

      openSnackbar({ text: "Gửi đánh giá thành công!", type: "success" });
      resetOfficerSelect();
      setRating(5); setComment("");
      onClose();
    } catch (error) {
      openSnackbar({ text: "Gửi lỗi, vui lòng thử lại", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledSheet visible={visible} onClose={handleSheetClose} mask autoHeight handler swipeToClose>
      <Header>
          <HeaderTitle>
            Đánh giá cán bộ
          </HeaderTitle>
      </Header>

      <Wrapper>
        <ContentStack>
        <SectionCard p={4} pt={2}>

        <Box mt={2}>
          <Text size="small" className="font-extrabold text-gray-700 ml-1 uppercase tracking-tight">
            Cán bộ tiếp nhận *
          </Text>
          <Select 
            key={officerSelectKey}
            value={officerName}
            placeholder="Chọn cán bộ..."
            onChange={(v) => setOfficerName(v as string)} 
            closeOnSelect
            className="mt-1.5 border-none bg-gray-50 rounded-xl text-base font-medium h-[44px]"
            style={{ border: "1px solid #d7e6fa", background: "#f8fbff" }}
          >
            {OFFICER_OPTIONS.map(option => (
              <Option key={option.value} value={option.value} title={option.title} />
            ))}
            <Box pb={10} />
          </Select>
        </Box>

        <Box mt={3}>
          <Text size="small" className="font-extrabold text-gray-700 ml-1 uppercase tracking-tight text-center w-full block">
              Mức độ hài lòng của bạn
          </Text>
            <StarContainer>
              {RATING_LEVELS.map((_, index) => {
                const star = index + 1;
                return (
              <Box key={star} onClick={() => setRating(star)} className="active:scale-75 transition-transform duration-150">
                <Icon 
                  icon={star <= rating ? "zi-star-solid" : "zi-star"} 
                  style={{ color: star <= rating ? currentRatingColor : "#d1d5db" }}
                  size={36}
                />
              </Box>
                );
              })}
            </StarContainer>
            <RatingLabel style={{ color: RATING_LEVELS[rating - 1].color }}>
              {ratingTexts[rating - 1]}
            </RatingLabel>
          </Box>
        </SectionCard>

        <SectionCard p={4}>
          <Text size="small" className="font-extrabold text-gray-700 ml-1 uppercase tracking-tight">Ý kiến đóng góp thêm</Text>
            <StyledTextArea
              placeholder="Chúng tôi luôn lắng nghe ý kiến của bạn..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </SectionCard>

        <Box pt={1} pb={4}>
            <Button
              fullWidth
              size="large"
              loading={loading}
              onClick={handleSubmit}
              className="rounded-2xl font-black shadow-lg active:scale-95 transition-all"
              style={{
                background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
                height: "clamp(46px, 12vw, 52px)",
                fontSize: "clamp(14px, 3.6vw, 16px)",
                fontWeight: 700,
              }}
            >
              GỬI ĐÁNH GIÁ NGAY
            </Button>
          </Box>
        </ContentStack>
      </Wrapper>
    </StyledSheet>
  );
};

export default OfficerRatingSheet;
