import {
    CreateGrievancePayload,
    GRIEVANCE_CATEGORY,
    MyGrievance,
} from "./GrievancePage.data";

export const safeJsonParse = (raw: string) => {
    try {
        return JSON.parse(raw);
    } catch (error) {
        const objectLike = raw.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
        if (!objectLike?.[1]) return null;
        try {
            return JSON.parse(objectLike[1]);
        } catch (innerError) {
            return null;
        }
    }
};

const toDate = (value: unknown): Date => {
    if (!value) return new Date();
    if (value instanceof Date) return value;
    const parsed = new Date(value as string);
    if (Number.isNaN(parsed.getTime())) return new Date();
    return parsed;
};

const pickValue = (row: Record<string, any>, keys: string[]): string => {
    const hit = keys.find(k => row?.[k] !== undefined && row?.[k] !== null);
    const value = hit ? row?.[hit] : "";
    return String(value || "").trim();
};

const extractDriveFileId = (url: string) => {
    const fromFilePath = url.match(/\/file\/d\/([^/]+)/);
    if (fromFilePath?.[1]) return fromFilePath[1];
    const fromOpenParam = url.match(/[?&]id=([^&]+)/);
    if (fromOpenParam?.[1]) return fromOpenParam[1];
    return "";
};

const normalizeImageUrl = (raw: string) => {
    const value = String(raw || "").trim();
    if (!value) return "";
    if (value === "Không có ảnh") return "";
    if (value.startsWith("Lỗi lưu Drive")) return "";
    if (value.startsWith("data:image")) return value;
    if (!value.includes("drive.google.com")) return value;

    const fileId = extractDriveFileId(value);
    if (!fileId) return value;
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
};

const normalizeListPayload = (payload: any): Record<string, any>[] => {
    if (Array.isArray(payload)) {
        return payload.filter(item => item && typeof item === "object");
    }

    const dataCandidates = [
        payload?.data?.items,
        payload?.data?.rows,
        payload?.data,
        payload?.items,
        payload?.rows,
        payload?.result?.items,
        payload?.result?.rows,
        payload?.result,
    ];

    const arrayLike = dataCandidates.find(Array.isArray);
    if (!Array.isArray(arrayLike)) return [];
    return arrayLike.filter(item => item && typeof item === "object");
};

export const mapBackendGrievances = (
    items: Record<string, any>[],
): MyGrievance[] =>
    items.map((row, index) => {
        const id =
            pickValue(row, ["id", "ID", "rowId", "row", "stt"]) ||
            `${Date.now()}-${index}`;
        const fullNameValue = pickValue(row, [
            "fullName",
            "name",
            "hoTen",
            "fullname",
            "Họ tên",
        ]);
        const phoneValue = pickValue(row, [
            "phoneNumber",
            "phone",
            "soDienThoai",
            "mobile",
            "Số điện thoại",
        ]);
        const addressValue = pickValue(row, [
            "location",
            "address",
            "khuVuc",
            "diaDiem",
            "Khu vực",
        ]);
        const contentValue = pickValue(row, [
            "content",
            "noiDung",
            "description",
            "Nội dung",
        ]);
        const statusValue = pickValue(row, ["status", "trangThai", "Trạng thái"]);
        const responseValue = pickValue(row, [
            "response",
            "phanHoi",
            "reply",
            "Nội dung trả lời phản ánh",
        ]);
        const createdAtRaw = pickValue(row, [
            "createdAt",
            "creationTime",
            "timestamp",
            "time",
            "ngayTao",
            "Thời gian",
        ]);
        const imageRaw = pickValue(row, [
            "image",
            "imageUrl",
            "imageBase64",
            "attachment",
            "Link Ảnh",
        ]);
        const normalizedImage = normalizeImageUrl(imageRaw);
        const hasImage = Boolean(
            normalizedImage ||
                row?.hasImage === true ||
                (Array.isArray(row?.imageUrls) && row?.imageUrls.length > 0),
        );

        return {
            id,
            fullName: fullNameValue || "Không rõ",
            phoneNumber: phoneValue || "-",
            address: addressValue || "-",
            content: contentValue || "",
            createdAt: toDate(createdAtRaw),
            hasImage,
            imageUrl: normalizedImage,
            status: statusValue || "Đã tiếp nhận",
            response: responseValue.trim(),
        };
    });

export const normalizeStatus = (status?: string) => {
    const value = String(status || "").trim();
    if (value === "Đang xử lý") return "Đang xử lý";
    if (value === "Đã xử lý") return "Đã xử lý";
    return "Đã tiếp nhận";
};

export const normalizeFullName = (value?: string) =>
    (value || "")
        .trim()
        .replace(/\s+/g, " ")
        .toUpperCase();

export const normalizePhoneFromZalo = (value?: string) => {
    if (!value) return "";
    const digits = value.replace(/\D/g, "");
    if (!digits) return "";
    if (digits.startsWith("84") && digits.length === 11) {
        return `0${digits.slice(2)}`;
    }
    if (digits.length >= 10) return digits.slice(0, 10);
    return digits;
};

export const parsePhoneFromPayload = (payload: any): string => {
    const candidates = [
        payload?.phoneNumber,
        payload?.number,
        payload?.data?.phoneNumber,
        payload?.data?.number,
        payload?.data?.data?.phoneNumber,
        payload?.data?.data?.number,
        payload?.result?.phoneNumber,
        payload?.result?.number,
    ];

    const firstValid = candidates.find(
        value => typeof value === "string" && value.trim(),
    );
    return normalizePhoneFromZalo(firstValid);
};

export const fetchMyGrievancesData = async (params: {
    listUrl: string;
    userId: string;
    fullName: string;
    phoneNumber: string;
    phoneToken: string;
    accessToken: string;
    onDebug: (label: string, data?: any) => void;
}): Promise<MyGrievance[]> => {
    const {
        listUrl,
        userId,
        fullName,
        phoneNumber,
        phoneToken,
        accessToken,
        onDebug,
    } = params;
    const payload = {
        action: "get-my-grievances",
        miniAppId: "",
        category: GRIEVANCE_CATEGORY,
        userId: userId || "",
        fullName: fullName || "",
        phoneNumber: phoneNumber || "",
        phoneToken: phoneToken || "",
        accessToken: accessToken || "",
    };

    let parsed: any = null;
    try {
        const res = await fetch(listUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(payload),
        });
        parsed = safeJsonParse(await res.text());
    } catch (postErr) {
        onDebug("fetchMyGrievances.POST.error", String(postErr));
    }

    if (!parsed) {
        const query = new URLSearchParams({
            action: "get-my-grievances",
            miniAppId: "",
            category: GRIEVANCE_CATEGORY,
            userId: userId || "",
            fullName: fullName || "",
            phoneNumber: phoneNumber || "",
            phoneToken: phoneToken || "",
        });
        const res = await fetch(`${listUrl}?${query.toString()}`, {
            method: "GET",
            headers: { Accept: "application/json" },
        });
        parsed = safeJsonParse(await res.text());
    }

    if (parsed?.error && parsed?.error !== 0) {
        throw new Error(parsed?.message || "Không thể lấy danh sách phản ánh");
    }

    return mapBackendGrievances(normalizeListPayload(parsed));
};

export const resolvePhoneByTokenData = async (params: {
    token: string;
    miniAppId: string;
    accessToken?: string;
    resolveUrl: string;
    onDebug: (label: string, data?: any) => void;
}): Promise<string> => {
    const { token, miniAppId, accessToken, resolveUrl, onDebug } = params;
    onDebug("resolvePhoneByToken.start", { hasToken: !!token, endpoint: resolveUrl });
    const requestBody = JSON.stringify({
        action: "resolve-phone",
        token,
        miniAppId,
        accessToken,
    });

    try {
        const postResponse = await fetch(resolveUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: requestBody,
        });
        onDebug("resolvePhoneByToken.POST.status", {
            ok: postResponse.ok,
            status: postResponse.status,
        });

        if (postResponse.ok) {
            try {
                const payload = await postResponse.json();
                onDebug("resolvePhoneByToken.POST.payload", payload);
                if (payload?.error && payload?.error !== 0) return "";
                const phone = parsePhoneFromPayload(payload);
                if (phone) return phone;
            } catch (error) {
                const text = await postResponse.text();
                onDebug("resolvePhoneByToken.POST.text", text);
                const phone = normalizePhoneFromZalo(text);
                if (phone) return phone;
            }
        }
    } catch (error) {
        onDebug("resolvePhoneByToken.POST.error", String(error));
    }

    try {
        const query = new URLSearchParams({
            action: "resolve-phone",
            token,
            miniAppId,
        });
        const getResponse = await fetch(`${resolveUrl}?${query.toString()}`, {
            method: "GET",
            headers: { Accept: "application/json" },
        });
        onDebug("resolvePhoneByToken.GET.status", {
            ok: getResponse.ok,
            status: getResponse.status,
        });
        if (!getResponse.ok) return "";

        try {
            const payload = await getResponse.json();
            onDebug("resolvePhoneByToken.GET.payload", payload);
            if (payload?.error && payload?.error !== 0) return "";
            return parsePhoneFromPayload(payload);
        } catch (error) {
            const text = await getResponse.text();
            onDebug("resolvePhoneByToken.GET.text", text);
            return normalizePhoneFromZalo(text);
        }
    } catch (error) {
        onDebug("resolvePhoneByToken.GET.error", String(error));
        return "";
    }
};

export const submitGrievanceData = async (params: {
    submitUrl: string;
    payload: CreateGrievancePayload;
    onDebug: (label: string, data?: any) => void;
}): Promise<void> => {
    const { submitUrl, payload, onDebug } = params;
    try {
        const res = await fetch(submitUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(payload),
        });
        const raw = await res.text();
        const parsed = safeJsonParse(raw);
        const isSuccessText = raw.trim().toLowerCase() === "success";
        const isSuccessJson = parsed && (!parsed.error || parsed.error === 0);
        if (!res.ok || (!isSuccessText && !isSuccessJson)) {
            throw new Error((parsed && parsed.message) || "Gửi phản ánh thất bại");
        }
    } catch (primaryErr) {
        onDebug("submit.primary.error", String(primaryErr));
        await fetch(submitUrl, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify(payload),
        });
    }
};

export const resizeImageBase64 = (base64Str: string): Promise<string> =>
    new Promise(resolve => {
        const img = new Image();
        img.src = base64Str;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const MAX_WIDTH = 800;
            const { width: sourceWidth, height: sourceHeight } = img;
            let width = sourceWidth;
            let height = sourceHeight;
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL("image/jpeg", 0.7));
        };
    });
