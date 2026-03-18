import React, { useEffect, useMemo, useState } from "react";
import { Box, Text, Input, Button, Icon, Select, Sheet, useSnackbar } from "zmp-ui";
import styled from "styled-components";
import tw from "twin.macro";
import PageLayout from "@components/layout/PageLayout";
import { useStore } from "@store";
import { MINI_APP_ID } from "@constants/common";
import {
  authorizeZaloScopes,
  getRawZaloUserInfo,
  getZaloPhoneNumber,
  getZaloSetting,
} from "presentation/services/zalo-permission.service";
import {
  AREA_OPTIONS,
  CreateGrievancePayload,
  DEFAULT_ADDRESS,
  DEFAULT_SCRIPT_URL,
  GRIEVANCE_CATEGORY,
  GRIEVANCE_LOOKUP_KEY,
  MyGrievance,
  TabKey,
} from "./GrievancePage.data";
import {
  fetchMyGrievancesData,
  normalizeFullName,
  normalizePhoneFromZalo,
  normalizeStatus,
  resizeImageBase64,
  resolvePhoneByTokenData,
  submitGrievanceData,
} from "./GrievancePage.logic";

const { Option } = Select;

/* ===== STYLED COMPONENTS ===== */
const StyledTextArea = styled(Input.TextArea)`
  ${tw`bg-gray-50 border-none rounded-2xl mt-1`};
  & textarea { ${tw`bg-transparent text-base p-2`}; min-height: 120px; }

  @media (max-width: 420px) {
    border-radius: 14px;
    & textarea {
      min-height: 96px;
      font-size: 15px;
      padding: 8px;
    }
  }

  @media (max-width: 360px) {
    & textarea {
      min-height: 88px;
      font-size: 14px;
    }
  }
`;

const StyledInput = styled(Input)`
  ${tw`border-none rounded-2xl mt-1`};
  background: #f4fbff;
  & input { ${tw`bg-transparent text-base px-2`}; height: 48px; }

  @media (max-width: 420px) {
    border-radius: 14px;
    & input {
      height: 44px;
      font-size: 15px;
    }
  }

  @media (max-width: 360px) {
    & input {
      height: 42px;
      font-size: 14px;
    }
  }
`;

const FormCard = styled(Box)`
  ${tw`rounded-3xl p-4 mb-2 border`};
  border-color: #dceef6;
  background: linear-gradient(180deg, #ffffff 0%, #f9fdff 100%);
  box-shadow: 0 10px 24px rgba(15, 41, 84, 0.07);

  @media (max-width: 420px) {
    padding: 12px;
    border-radius: 18px;
  }
`;

const TabHeader = styled(Box)`
  ${tw`mb-2 mt-[-6px] rounded-xl p-1 border`}
  border-color: #cfe4ff;
  background: linear-gradient(135deg, #eef6ff 0%, #ffffff 70%);
  box-shadow: 0 4px 12px rgba(4, 109, 214, 0.08);

  @media (max-width: 420px) {
    margin-top: -2px;
    margin-bottom: 10px;
  }
`;

const TabContainer = styled(Box)`
  ${tw`flex w-full gap-1`}
`;

const TabButton = styled.button<{ $active: boolean }>`
  ${tw`h-11 rounded-lg text-[12px] font-semibold transition-all flex items-center justify-center gap-1.5 relative flex-1`}
  min-width: 0;
  padding: 0 10px;
  white-space: nowrap;
  ${({ $active }) =>
    $active
      ? tw`text-white shadow-sm`
      : tw`bg-transparent text-blue-900/80`}
  ${({ $active }) =>
    $active
      ? "background: linear-gradient(135deg, #1f6ddf 0%, #37a0ff 100%);"
      : ""}

  @media (max-width: 420px) {
    height: 40px;
    font-size: 11px;
    gap: 4px;
    padding: 0 6px;
  }

  @media (max-width: 360px) {
    height: 38px;
    font-size: 10px;
    gap: 3px;
    padding: 0 4px;
  }
`;

const TabIconWrap = styled.span<{ $active: boolean }>`
  ${tw`w-5 h-5 rounded-full flex items-center justify-center`}
  ${({ $active }) => ($active ? tw`bg-white/20` : tw`bg-blue-100`)}

  @media (max-width: 360px) {
    width: 18px;
    height: 18px;
  }
`;

const CountBadge = styled.span<{ $active: boolean }>`
  ${tw`min-w-[18px] h-[18px] px-1 text-[10px] leading-[18px] font-semibold text-center absolute right-1 top-1`}
  border-radius: 9999px;
  ${({ $active }) =>
    $active ? tw`bg-white/20 text-white` : tw`bg-white text-blue-700 border border-blue-100`}

  @media (max-width: 420px) {
    right: 2px;
    top: 2px;
    min-width: 16px;
    height: 16px;
    line-height: 16px;
    font-size: 9px;
  }

  @media (max-width: 360px) {
    min-width: 14px;
    height: 14px;
    line-height: 14px;
    font-size: 8px;
    right: 1px;
  }
`;

const EmptyState = styled(Box)`
  ${tw`rounded-3xl p-6 text-center border text-gray-500`}
  border-color: #dceef6;
  background: linear-gradient(180deg, #ffffff 0%, #f7fcff 100%);
`;

const DetailSheet = styled(Sheet)`
  .zmp-sheet-content {
    border-radius: 24px 24px 0 0;
    overflow: hidden;
    background: linear-gradient(180deg, #eef7ff 0%, #ffffff 48%);
    box-shadow: 0 -16px 30px rgba(10, 32, 70, 0.12);
  }
`;

const DetailSheetBody = styled(Box)`
  ${tw`px-4 pt-4 pb-0`};
  max-height: 75vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: #eef7ff;

  @media (max-width: 420px) {
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 12px;
  }
`;

const DetailSheetTitle = styled(Box)`
  ${tw`flex items-center justify-center px-4 py-5 border-b text-center`};
  border-color: #dbe7f7;
  background: linear-gradient(180deg, #ffffff 0%, #f5f9ff 100%);

  @media (max-width: 420px) {
    padding-top: 14px;
    padding-bottom: 14px;
  }
`;

const DetailHeader = styled(Box)`
  ${tw`rounded-3xl p-4 mb-3`};
  border: 1px solid #e5edf7;
  background: #fff;

  @media (max-width: 420px) {
    padding: 12px;
    border-radius: 18px;
  }
`;

const DetailCard = styled(Box)`
  ${tw`rounded-3xl p-3 mt-3`};
  border: 1px solid #e5edf7;
  background: #ffffff;
`;

const ResponseCard = styled(Box)`
  ${tw`rounded-3xl p-3 mt-3`};
  border: 1px solid #d7edff;
  background: rgba(18, 174, 226, 0.08);
`;

const ScrollableContent = styled(Box)`
  max-height: 22vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const StatusPill = styled.span`
  ${tw`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border`};
  color: #0a5bb6;
  border-color: #cfe4ff;
  background: rgba(18, 174, 226, 0.12);
  white-space: nowrap;
`;

const getGroupTheme = (group: string) => {
  if (group === "Đã xử lý") {
    return {
      bg: "#edf9f2",
      border: "#cdecd8",
      text: "#0f6a45",
      countBg: "#dbf3e6",
      countBorder: "#bfe8d1",
    };
  }

  if (group === "Đang xử lý") {
    return {
      bg: "#fff8ea",
      border: "#ffe5b3",
      text: "#8a5600",
      countBg: "#ffefcb",
      countBorder: "#ffdd9a",
    };
  }

  return {
    bg: "#eef5ff",
    border: "#d7e8fb",
    text: "#0b3f84",
    countBg: "#dfeeff",
    countBorder: "#bcd8fa",
  };
};

const GroupHeader = styled(Box)<{ $group: string }>`
  ${tw`flex items-center justify-between px-3 py-2 mb-2 mt-1`};
  background: transparent;

  @media (max-width: 420px) {
    padding: 8px 10px;
  }
`;

const GroupTitle = styled(Text)<{ $group: string }>`
  ${tw`font-semibold text-[14px] uppercase`};
  ${({ $group }) => getGroupTheme($group).text};
  letter-spacing: 0.2px;

  @media (max-width: 420px) {
    font-size: 12px;
  }
`;

const GroupCount = styled.span<{ $group: string }>`
  ${tw`text-[12px] font-black px-2.5 py-0.5`};
  border: 1px solid #fecaca;
  background: #fee2e2;
  color: #b91c1c;

  @media (max-width: 420px) {
    font-size: 11px;
    padding: 1px 8px;
  }
`;

const GroupCard = styled(FormCard)`
  ${tw`p-0 overflow-hidden mb-3`};
`;

const MyItemCard = styled(Box)`
  ${tw`p-4`};
  background: #ffffff;
  border-top: 1px solid #e5edf7;

  @media (max-width: 420px) {
    padding: 12px;
  }
`;

const getStatusBadgeStyle = (status: string) => {
  if (status === "Đã xử lý") {
    return `
      color: #0a8a5b;
      background: #eafaf3;
      border-color: #ccefdc;
    `;
  }
  if (status === "Đang xử lý") {
    return `
      color: #9a5b00;
      background: #fff5e5;
      border-color: #ffe0a8;
    `;
  }
  return `
    color: #0a5bb6;
    background: rgba(18, 174, 226, 0.1);
    border-color: #d7edff;
  `;
};

const StatusBadge = styled.span<{ $status: string }>`
  ${tw`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border`};
  ${({ $status }) => getStatusBadgeStyle($status)}
`;

const ReplyPreview = styled(Box)`
  ${tw`mt-3 p-2 rounded-2xl`};
  border: 1px solid #d7edff;
  background: rgba(18, 174, 226, 0.1);
`;

const DetailAction = styled(Button)`
  ${tw`ml-2`};
  height: 26px;
  padding: 0 8px;

  @media (max-width: 420px) {
    margin-left: 0;
    height: 24px;
    padding: 0 7px;
  }
`;

const PageBody = styled(Box)`
  ${tw`px-4`};
  padding-bottom: calc(16px + env(safe-area-inset-bottom));
  min-height: calc(100vh - 56px);
  background:
    radial-gradient(circle at 0% -10%, rgba(44, 143, 255, 0.2) 0%, transparent 45%),
    radial-gradient(circle at 100% 0%, rgba(18, 174, 226, 0.16) 0%, transparent 42%),
    linear-gradient(180deg, #eef7ff 0%, #ffffff 38%);

  @media (max-width: 420px) {
    padding-left: 12px;
    padding-right: 12px;
    padding-bottom: calc(12px + env(safe-area-inset-bottom));
  }

  @media (max-width: 360px) {
    padding-left: 10px;
    padding-right: 10px;
  }

  .grievance-area-select {
    min-height: 48px;
  }

  @media (max-width: 360px) {
    .grievance-area-select {
      min-height: 42px;
      font-size: 13px;
    }
  }
`;

const ReporterHeader = styled(Box)`
  ${tw`mb-3`};

  @media (max-width: 420px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .grievance-reporter-btn {
    white-space: nowrap;
  }

  @media (max-width: 420px) {
    .grievance-reporter-btn {
      width: 100%;
      height: 30px !important;
      font-size: 11px !important;
      padding: 0 10px !important;
    }
  }

  @media (max-width: 360px) {
    .grievance-reporter-btn {
      font-size: 10px !important;
      padding: 0 8px !important;
    }
  }
`;

const AttachmentRow = styled(Box)`
  ${tw`bg-blue-50/50 p-4 rounded-2xl border border-dashed border-blue-200`};

  @media (max-width: 420px) {
    padding: 12px;
    border-radius: 14px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const MyItemTopRow = styled(Box)`
  ${tw`mb-2`};

  @media (max-width: 420px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const MyItemActionRow = styled(Box)`
  @media (max-width: 420px) {
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  @media (max-width: 360px) {
    flex-wrap: wrap;
    row-gap: 6px;
  }
`;

const DetailHeaderTop = styled(Box)`
  @media (max-width: 420px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const SectionTitle = ({ icon, children }: { icon: string, children: string }) => (
  <Box flex alignItems="center" className="mb-3">
    <Icon icon={icon as any} size={16} className="text-blue-600 mr-2" />
    <Text size="small" className="font-bold text-gray-800 uppercase tracking-wider">
      {children}
    </Text>
  </Box>
);

const GrievancePage: React.FC = () => {
  const isGetReporterInfoEnabled = false;
  const [activeTab, setActiveTab] = useState<TabKey>("create");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [content, setContent] = useState("");
  const [address, setAddress] = useState(DEFAULT_ADDRESS);
  const [image, setImage] = useState("");
  const [submittedPhoneNumber, setSubmittedPhoneNumber] = useState("");
  const [lookupPhone, setLookupPhone] = useState("");
  const [lookupName, setLookupName] = useState("");
  const [myGrievances, setMyGrievances] = useState<MyGrievance[]>([]);
  const [selectedGrievance, setSelectedGrievance] = useState<MyGrievance | null>(null);
  const [loadingMyGrievances, setLoadingMyGrievances] = useState(false);
  const [myGrievancesError, setMyGrievancesError] = useState("");
  const [loading, setLoading] = useState(false);
  const [gettingReporterInfo, setGettingReporterInfo] = useState(false);
  const [phoneToken, setPhoneToken] = useState("");
  const [, setDebugLines] = useState<string[]>([]);
  const { openSnackbar } = useSnackbar();
  const user = useStore(state => state.user);
  const loadUserInfo = useStore(state => state.getUserInfo);
  const accessToken = useStore(state => state.token);

  const GRIEVANCE_SUBMIT_URL = import.meta.env.VITE_GRIEVANCE_SUBMIT_URL || DEFAULT_SCRIPT_URL;
  const GRIEVANCE_LIST_URL = import.meta.env.VITE_GRIEVANCE_LIST_URL || GRIEVANCE_SUBMIT_URL;
  const PHONE_RESOLVE_URL = import.meta.env.VITE_PHONE_RESOLVE_URL || DEFAULT_SCRIPT_URL;

  const formattedMyGrievances = useMemo(
    () =>
      myGrievances.map(item => ({
        ...item,
        displayTime: item.createdAt.toLocaleString("vi-VN", { hour12: false }),
      })),
    [myGrievances],
  );

  const myGrievanceCount = formattedMyGrievances.length;

  useEffect(() => {
    if (!user?.id) {
      loadUserInfo();
    }
  }, [user?.id, loadUserInfo]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(GRIEVANCE_LOOKUP_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      setLookupPhone(String(parsed?.phoneNumber || ""));
      setLookupName(String(parsed?.fullName || ""));
    } catch (error) {
      // ignore malformed local cache
    }
  }, []);

  const fetchMyGrievances = async () => {
    try {
      setLoadingMyGrievances(true);
      setMyGrievancesError("");
      const list = await fetchMyGrievancesData({
        listUrl: GRIEVANCE_LIST_URL,
        userId: user?.id || "",
        fullName: fullName || user?.name || lookupName || "",
        phoneNumber: phoneNumber || submittedPhoneNumber || lookupPhone || "",
        phoneToken: phoneToken || "",
        accessToken: accessToken || "",
        onDebug: pushDebug,
      });
      setMyGrievances(list);
    } catch (error) {
      setMyGrievances([]);
      setMyGrievancesError("Không tải được dữ liệu phản ánh từ Google Sheet.");
      pushDebug("fetchMyGrievances.error", String(error));
    } finally {
      setLoadingMyGrievances(false);
    }
  };

  useEffect(() => {
    if (activeTab === "mine") {
      fetchMyGrievances();
    }
  }, [activeTab, user?.id, submittedPhoneNumber, lookupPhone, lookupName]);

  useEffect(() => {
    if (activeTab !== "mine") {
      setSelectedGrievance(null);
    }
  }, [activeTab]);

  const handleGetReporterInfoClick = () => {
    if (!isGetReporterInfoEnabled) {
      openSnackbar({
        text: "Tính năng đang phát triển",
        type: "info",
      });
      return;
    }
    handleGetReporterInfo();
  };

  /* --- Logic chuẩn hóa dữ liệu --- */
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase();
    value = value.replace(/\s+/g, ' ');
    setFullName(value);
  };

  const handlePhoneChange = (val: string) => {
    const numberOnly = val.replace(/[^0-9]/g, "");
    if (numberOnly.length <= 10) setPhoneNumber(numberOnly);
  };

  const handleContentBlur = () => {
    const cleanedContent = content.trim().replace(/[ \t]+/g, ' '); 
    setContent(cleanedContent);
  };

  const pushDebug = (label: string, data?: any) => {
    const timestamp = new Date().toLocaleTimeString("vi-VN", { hour12: false });
    let serialized = "";
    try {
      serialized = data === undefined ? "" : JSON.stringify(data);
    } catch (error) {
      serialized = String(data);
    }
    const line = `[${timestamp}] ${label}${serialized ? `: ${serialized}` : ""}`;
    setDebugLines(prev => [line, ...prev].slice(0, 80));
  };

  const resolvePhoneByToken = async (token: string): Promise<string> =>
    resolvePhoneByTokenData({
      token,
      miniAppId: MINI_APP_ID,
      accessToken,
      resolveUrl: PHONE_RESOLVE_URL,
      onDebug: pushDebug,
    });

  const handleGetReporterInfo = async () => {
    let gotName = false;
    let gotPhone = false;
    setDebugLines([]);
    pushDebug("handleGetReporterInfo.start");

    try {
      setGettingReporterInfo(true);

      // 1) Lấy tên tài khoản
      try {
        const cachedName = normalizeFullName(user?.name);
        if (cachedName) {
          setFullName(cachedName);
          gotName = true;
        }

        const userSetting: any = await getZaloSetting();
        pushDebug("getSetting.userInfo", userSetting);
        const hasUserInfoPermission = !!userSetting?.authSetting?.["scope.userInfo"];
        if (!hasUserInfoPermission) {
          const authUserRes = await authorizeZaloScopes(["scope.userInfo"]);
          pushDebug("authorize.userInfo", authUserRes);
        }

        const userRes: any = await getRawZaloUserInfo();
        pushDebug("getUserInfo", userRes);
        const userName = normalizeFullName(userRes?.userInfo?.name || userRes?.name);

        if (userName) {
          setFullName(userName);
          gotName = true;
        }
      } catch (error) {
        pushDebug("getName.error", String(error));
        // Không chặn bước lấy số điện thoại
      }

      // 2) Lấy số điện thoại
      try {
        const phoneSetting: any = await getZaloSetting();
        pushDebug("getSetting.phone", phoneSetting);
        const hasPhonePermission = !!phoneSetting?.authSetting?.["scope.userPhonenumber"];
        if (!hasPhonePermission) {
          const authPhoneRes = await authorizeZaloScopes(["scope.userPhonenumber"]);
          pushDebug("authorize.phone", authPhoneRes);
        }

        const phoneRes: any = await getZaloPhoneNumber();
        pushDebug("getPhoneNumber", phoneRes);
        const directPhone = normalizePhoneFromZalo(phoneRes?.number);
        if (directPhone) {
          setPhoneNumber(directPhone);
          setPhoneToken(phoneRes?.token || "");
          gotPhone = true;
        } else if (phoneRes?.token) {
          setPhoneToken(phoneRes.token);
          const backendPhone = await resolvePhoneByToken(phoneRes.token);
          if (backendPhone) {
            setPhoneNumber(backendPhone);
            gotPhone = true;
          }
        }
      } catch (error) {
        pushDebug("getPhone.error", String(error));
        // Bỏ qua, sẽ báo tổng kết bên dưới
      }

      if (gotName && gotPhone) {
        openSnackbar({
          text: "Đã lấy họ tên và số điện thoại từ Zalo.",
          type: "success",
        });
      } else if (gotName && !gotPhone) {
        openSnackbar({
          text: "Đã lấy họ tên. Số điện thoại chưa giải mã được từ token, vui lòng kiểm tra endpoint resolve-phone.",
          type: "info",
        });
      } else if (!gotName && gotPhone) {
        openSnackbar({
          text: "Đã lấy số điện thoại. Họ tên chưa lấy được, vui lòng nhập tay.",
          type: "info",
        });
      } else {
        openSnackbar({
          text: "Không lấy được thông tin từ Zalo. Vui lòng kiểm tra quyền truy cập.",
          type: "error",
        });
      }
    } catch (error) {
      pushDebug("handleGetReporterInfo.error", String(error));
      openSnackbar({
        text: "Không thể lấy thông tin từ tài khoản Zalo.",
        type: "error",
      });
    } finally {
      pushDebug("handleGetReporterInfo.done", { gotName, gotPhone, fullName, phoneNumber, phoneToken: !!phoneToken });
      setGettingReporterInfo(false);
    }
  };

  const handleChooseImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64 = reader.result as string;
          const compressed = await resizeImageBase64(base64);
          setImage(compressed);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleSubmit = async () => {
    if (!fullName.trim() || !phoneNumber.trim() || !content.trim()) {
      openSnackbar({ text: "Vui lòng điền đủ các trường có dấu *", type: "error" });
      return;
    }
    setLoading(true);
    try {
      let resolvedUserId = user?.id || "";
      if (!resolvedUserId) {
        try {
          const userRes: any = await getRawZaloUserInfo();
          resolvedUserId = String(userRes?.userInfo?.id || userRes?.id || "");
        } catch (userErr) {
          pushDebug("submit.getUserInfo.error", String(userErr));
        }
      }

      // Payload được sắp theo thứ tự cột Google Sheet:
      // ID, Thời gian, Họ tên, Số điện thoại, Khu vực, Nội dung, Link Ảnh,
      // Nội dung trả lời phản ánh, Trạng thái, User ID, MiniApp ID, Phone Token.
      const submitPayload: CreateGrievancePayload = {
        action: "create-grievance",
        id: "",
        createdAt: "",
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        location: address,
        content: content.trim(),
        image,
        response: "",
        status: "Đã tiếp nhận",
        userId: resolvedUserId,
        miniAppId: MINI_APP_ID || "",
        phoneToken: phoneToken || "",
        category: GRIEVANCE_CATEGORY,
      };
      await submitGrievanceData({
        submitUrl: GRIEVANCE_SUBMIT_URL,
        payload: submitPayload,
        onDebug: pushDebug,
      });

      openSnackbar({ text: "Gửi phản ánh thành công!", type: "success" });
      const latestPhone = phoneNumber.trim();
      const latestName = fullName.trim();
      setSubmittedPhoneNumber(latestPhone);
      setLookupPhone(latestPhone);
      setLookupName(latestName);
      localStorage.setItem(
        GRIEVANCE_LOOKUP_KEY,
        JSON.stringify({ phoneNumber: latestPhone, fullName: latestName }),
      );
      setFullName(""); setPhoneNumber(""); setContent(""); setImage("");
      setActiveTab("mine");
      setTimeout(() => {
        fetchMyGrievances();
      }, 900);
    } catch (error) {
      openSnackbar({ text: "Gửi lỗi, vui lòng thử lại", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const renderMyGrievances = () => {
    if (loadingMyGrievances) {
      return (
        <EmptyState>
          <Text className="font-semibold text-gray-700">Đang tải phản ánh...</Text>
        </EmptyState>
      );
    }

    if (myGrievancesError) {
      return (
        <EmptyState>
          <Text className="font-semibold text-red-600">{myGrievancesError}</Text>
          <Button
            size="small"
            className="mt-3"
            variant="secondary"
            onClick={fetchMyGrievances}
          >
            Thử lại
          </Button>
        </EmptyState>
      );
    }

    if (formattedMyGrievances.length === 0) {
      return (
        <EmptyState>
          <Text className="font-semibold text-gray-700">Chưa có phản ánh nào</Text>
          <Text size="xSmall" className="mt-1 text-gray-500">
            Các phản ánh bạn gửi sẽ hiển thị tại đây.
          </Text>
        </EmptyState>
      );
    }

    const groups: Array<{ title: string; items: typeof formattedMyGrievances }> = [
      {
        title: "Đã tiếp nhận",
        items: formattedMyGrievances.filter(item => normalizeStatus(item.status) === "Đã tiếp nhận"),
      },
      {
        title: "Đang xử lý",
        items: formattedMyGrievances.filter(item => normalizeStatus(item.status) === "Đang xử lý"),
      },
      {
        title: "Đã xử lý",
        items: formattedMyGrievances.filter(item => normalizeStatus(item.status) === "Đã xử lý"),
      },
    ];

    return groups
      .filter(group => group.items.length > 0)
      .map(group => (
        <GroupCard key={group.title}>
          <GroupHeader $group={group.title}>
            <GroupTitle $group={group.title}>{group.title}</GroupTitle>
            <GroupCount $group={group.title}>{group.items.length}</GroupCount>
          </GroupHeader>
          {group.items.map(item => (
            <MyItemCard key={item.id}>
              <MyItemTopRow flex justifyContent="space-between" alignItems="center">
                <StatusBadge $status={normalizeStatus(item.status)}>
                  {normalizeStatus(item.status)}
                </StatusBadge>
                <MyItemActionRow flex alignItems="center">
                  <Text size="xSmall" className="text-gray-500">{item.displayTime}</Text>
                  <DetailAction
                    size="small"
                    variant="secondary"
                    onClick={() => setSelectedGrievance(item)}
                    style={{ cursor: "pointer" }}
                  >
                    Xem chi tiết
                  </DetailAction>
                </MyItemActionRow>
              </MyItemTopRow>
              <Text size="small" className="font-semibold text-gray-800">
                <b>Họ và tên:</b> {item.fullName}
              </Text>
              <Text size="xSmall" className="mt-0.5 text-gray-500">
                <b>Số điện thoại:</b> {item.phoneNumber}
              </Text>
              <Text size="xSmall" className="mt-0.5 text-gray-500">
                <b>Địa chỉ:</b> {item.address}
              </Text>
              <Text size="small" className="mt-2 text-gray-700">
                <b>Nội dung phản ánh:</b>
              </Text>
              <Text size="small" className="text-gray-700 whitespace-pre-wrap leading-6">
                {item.content}
              </Text>
              <ReplyPreview>
                <Text size="xSmall" className="font-semibold text-blue-700">Nội dung trả lời phản ánh</Text>
                <Text size="xSmall" className="text-blue-900 mt-1 whitespace-pre-wrap">
                  {item.response ? "Đã có phản hồi từ cơ quan xử lý" : "Chưa có phản hồi từ cơ quan xử lý"}
                </Text>
              </ReplyPreview>
            </MyItemCard>
          ))}
        </GroupCard>
      ));
  };

  return (
    <PageLayout
      tw="bg-white"
      title="Phản ánh kiến nghị"
      id="Grievance"
    >
    <PageBody>
        <TabHeader>
          <TabContainer>
            <TabButton
              type="button"
              $active={activeTab === "create"}
              onClick={() => setActiveTab("create")}
            >
              <TabIconWrap $active={activeTab === "create"}>
                <Icon
                  icon={"zi-location-solid" as any}
                  size={11}
                  className={activeTab === "create" ? "text-white" : "text-blue-700"}
                />
              </TabIconWrap>
              Tạo phản ánh
            </TabButton>
            <TabButton
              type="button"
              $active={activeTab === "mine"}
              onClick={() => setActiveTab("mine")}
            >
              <TabIconWrap $active={activeTab === "mine"}>
                <Icon
                  icon={"zi-user-solid" as any}
                  size={11}
                  className={activeTab === "mine" ? "text-white" : "text-blue-700"}
                />
              </TabIconWrap>
              Phản ánh của tôi
              <CountBadge $active={activeTab === "mine"}>{myGrievanceCount}</CountBadge>
            </TabButton>
          </TabContainer>
        </TabHeader>

      {activeTab === "create" ? (
      <>
        {/* Khối Thông tin cá nhân */}
        <FormCard>
          <ReporterHeader flex alignItems="center" justifyContent="space-between">
            <Box flex alignItems="center">
              <Icon icon={"zi-user-solid" as any} size={16} className="text-blue-600 mr-2" />
              <Text size="small" className="font-bold text-gray-800 uppercase tracking-wider">
                Thông tin người phản ánh
              </Text>
            </Box>
            <Button
              size="small"
              variant="secondary"
              loading={gettingReporterInfo}
              disabled={gettingReporterInfo}
              onClick={handleGetReporterInfoClick}
              className="rounded-lg grievance-reporter-btn"
              style={{ height: "28px", padding: "0 8px", fontSize: "11px", fontWeight: 600 }}
            >
              Lấy thông tin cá nhân từ Zalo
            </Button>
          </ReporterHeader>
          <Box mt={2}>
            <Text size="small" className="font-bold text-gray-600 ml-1">Họ và tên *</Text>
            <StyledInput 
              style={{ textTransform: 'uppercase' }} 
              placeholder="Nhập họ và tên của bạn" 
              value={fullName} 
              onChange={handleFullNameChange}
              onBlur={() => setFullName(fullName.trim())}
            />
          </Box>

          <Box mt={4}>
            <Text size="small" className="font-bold text-gray-600 ml-1">Số điện thoại *</Text>
            <StyledInput 
              type="text" 
              inputMode="numeric" 
              placeholder="Nhập số điện thoại liên hệ" 
              value={phoneNumber} 
              onChange={(e) => handlePhoneChange(e.target.value)} 
            />
          </Box>
        </FormCard>

        {/* Khối Nội dung phản ánh */}
        <FormCard>
          <SectionTitle icon="zi-location-solid">Địa điểm & Nội dung</SectionTitle>
          <Box mt={2}>
            <Text size="small" className="font-bold text-gray-600 ml-1">Khu vực phản ánh</Text>
            <Select 
              defaultValue={DEFAULT_ADDRESS} 
              onChange={(v) => setAddress(v as string)} 
              closeOnSelect 
              className="mt-1 border-none bg-gray-50 rounded-xl text-sm h-[48px] flex items-center grievance-area-select"
            >
              {AREA_OPTIONS.map(area => (
                <Option key={area} value={area} title={area} />
              ))}
            </Select>
          </Box>

          <Box mt={4}>
            <Text size="small" className="font-bold text-gray-600 ml-1">Nội dung phản ánh *</Text>
            <StyledTextArea 
              placeholder="Mô tả sự việc chi tiết để chúng tôi nắm bắt rõ hơn..." 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              onBlur={handleContentBlur}
            />
          </Box>

          <AttachmentRow mt={4} flex alignItems="center" justifyContent="space-between">
            <Box>
              <Text size="small" className="font-bold text-blue-900">Hình ảnh hiện trường</Text>
              <Text size="xxxSmall" className={image ? "text-green-600 font-bold" : "text-blue-400"}>
                {image ? "✅ Đã chọn ảnh thành công" : "Vui lòng đính kèm hình ảnh"}
              </Text>
            </Box>
            {image ? (
              <Box className="relative">
                <img 
                  src={image} 
                  alt=""
                  className="rounded-sm object-cover border border-gray-100 shadow-sm" 
                  style={{ width: "48px", height: "48px" }} 
                />
                <Box 
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center shadow-md active:opacity-70" 
                  onClick={() => setImage("")}
                  style={{ zIndex: 1 }}
                >
                  <Icon icon="zi-delete" size={16} />
                </Box>
              </Box>
            ) : (
              <Box 
                onClick={handleChooseImage} 
                className="w-8 h-8 bg-white rounded-xl shadow-sm flex items-center justify-center active:bg-gray-100 transition-all border border-gray-200"
              >
                <Icon icon="zi-camera" className="text-blue-500" size={30} />
              </Box>
            )}
          </AttachmentRow>
        </FormCard>

        {/* Khối hoàn tất: Bảo mật & Gửi */}
        <FormCard className="bg-white">
          <Box className="bg-blue-50/50 p-3 rounded-xl border border-blue-50">
            <Box flex alignItems="center" className="mb-1">
              <Icon icon="zi-add-user-solid" size={18} className="text-blue-600 mr-2" />
              <Text className="font-bold text-blue-800 uppercase tracking-tight" style={{ fontSize: '12px' }}>
                Cam kết bảo mật
              </Text>
            </Box>
            <Text className="text-blue-900/70 leading-relaxed text-justify" style={{ fontSize: '12px' }}>
              Thông tin cá nhân của bạn được bảo vệ theo quy định pháp luật và chỉ phục vụ mục đích xử lý, phản hồi phản ánh.
            </Text>
          </Box>
          
          <Box style={{ marginTop: "20px", paddingBottom: "12px" }}> 
            <Button 
                fullWidth 
                size="large" 
                loading={loading} 
                onClick={handleSubmit} 
                className="rounded-2xl font-black shadow-lg active:scale-95 transition-all" 
              style={{ 
                background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)", 
                  height: "clamp(46px, 12vw, 52px)",
                  fontSize: "clamp(13px, 3.7vw, 16px)",
                  fontWeight: 700
                }}
            >
              {loading ? "ĐANG XỬ LÝ..." : "GỬI THÔNG TIN PHẢN ÁNH"}
            </Button>
          </Box>
        </FormCard>
      </>
      ) : (
        <Box>
          {renderMyGrievances()}
        </Box>
      )}
      <DetailSheet
        visible={Boolean(selectedGrievance)}
        onClose={() => setSelectedGrievance(null)}
        mask
        autoHeight
        handler
        swipeToClose
      >
        {selectedGrievance ? (
          <>
            <DetailSheetTitle>
              <Text
                className="text-blue-600 font-black tracking-tight"
                style={{ fontWeight: 600, fontSize: "clamp(17px, 5vw, 20px)" }}
              >
                Chi tiết phản ánh
              </Text>
            </DetailSheetTitle>
            <DetailSheetBody>
            <DetailHeader>
              <DetailHeaderTop flex justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Text className="font-bold text-gray-900">Thông tin phản ánh</Text>
                </Box>
                <StatusPill>{normalizeStatus(selectedGrievance.status)}</StatusPill>
              </DetailHeaderTop>
              <Box className="mt-3 grid gap-1.5">
                <Text size="small" className="text-gray-700">
                  <b>Thời gian:</b> {selectedGrievance.createdAt.toLocaleString("vi-VN", { hour12: false })}
                </Text>
                <Text size="small" className="text-gray-700">
                  <b>Họ và tên:</b> {selectedGrievance.fullName}
                </Text>
                <Text size="small" className="text-gray-700">
                  <b>Số điện thoại:</b> {selectedGrievance.phoneNumber}
                </Text>
                <Text size="small" className="text-gray-700">
                  <b>Địa chỉ phản ánh:</b> {selectedGrievance.address}
                </Text>
              </Box>
            </DetailHeader>

            <DetailCard>
              <Text size="xSmall" className="font-bold text-gray-700 mb-1">Nội dung phản ánh</Text>
              <ScrollableContent>
                <Text size="small" className="text-gray-800 whitespace-pre-wrap leading-6">
                  {selectedGrievance.content}
                </Text>
              </ScrollableContent>
            </DetailCard>

            <ResponseCard>
              <Text size="xSmall" className="font-bold text-blue-700 mb-1">Nội dung trả lời phản ánh</Text>
              <ScrollableContent>
                <Text size="small" className="text-blue-900 whitespace-pre-wrap leading-6">
                  {selectedGrievance.response || "Chưa có phản hồi từ cơ quan xử lý"}
                </Text>
              </ScrollableContent>
            </ResponseCard>
            </DetailSheetBody>
          </>
        ) : null}
      </DetailSheet>
      </PageBody>
    </PageLayout>
  );
};

export default GrievancePage;
