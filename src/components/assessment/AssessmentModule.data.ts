export interface AssessmentSheetProps {
    visible: boolean;
    onClose: () => void;
}

export interface RatingLevel {
    text: string;
    color: string;
}

export interface OfficerOption {
    value: string;
    title: string;
}

export const ASSESSMENT_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzmsg8AVBSnLT9iEtCrNZQH2h0TjtlT8wKJgnKiJjingk4oIBMkPi7I6XRb_zuRj3X6/exec";

export const RATING_LEVELS: RatingLevel[] = [
    { text: "Rất không hài lòng", color: "#dc2626" },
    { text: "Không hài lòng", color: "#f97316" },
    { text: "Bình thường", color: "#f59e0b" },
    { text: "Hài lòng", color: "#3b82f6" },
    { text: "Rất hài lòng", color: "#16a34a" },
];

export const OFFICER_OPTIONS: OfficerOption[] = [
    { value: "Võ Thị Quỳnh Anh", title: "Võ Thị Quỳnh Anh - Chuyên viên" },
    { value: "Lê Thị Dung", title: "Lê Thị Dung - Chuyên viên" },
    { value: "Lê Thị Na", title: "Lê Thị Na - Chuyên viên" },
    {
        value: "Nguyễn Thị Bích Phượng",
        title: "Nguyễn Thị Bích Phượng - Chuyên viên",
    },
    { value: "Lê Ngọc Tú", title: "Lê Ngọc Tú - Chuyên viên" },
    { value: "Bùi Thị Hoàng Hà", title: "Bùi Thị Hoàng Hà - Chuyên viên" },
    { value: "Trần Cỏn Lầm", title: "Trần Cỏn Lầm - Nhân viên" },
    { value: "Phan Nhã Uyên", title: "Phan Nhã Uyên - Nhân viên" },
];
