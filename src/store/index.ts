import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import createAppStore, { AppSlice } from "./appSlice";
import createAuthStore, { AuthSlice } from "./authSlice";
import createFeedbackSlide, { FeedbackSlice } from "./feedbackSlice";
import createInformationGuideSlide, {
    InformationGuideSlice,
} from "./informationGuideSlice";
import createOrganizationSlide, {
    OrganizationSlice,
} from "./organizationSlice";
import createScheduleSlide, { ScheduleSlice } from "./scheduleSlice";
import createProfileSlice, { ProfileSlice } from "./profileSlice";

type State = AppSlice &
    AuthSlice &
    FeedbackSlice &
    InformationGuideSlice &
    OrganizationSlice &
    ScheduleSlice &
    ProfileSlice;

export const useStore = create<State>()(
    devtools(
        persist(
            (...a) => ({
                ...createAppStore(...a),
                ...createAuthStore(...a),
                ...createFeedbackSlide(...a),
                ...createInformationGuideSlide(...a),
                ...createOrganizationSlide(...a),
                ...createScheduleSlide(...a),
                ...createProfileSlice(...a),
            }),
            {
                name: "pbso-app-store",
                // NOTE: Giữ token + organization để khi đóng webview quay lại không bị cảm giác reload Home.
                partialize: state => ({
                    token: state.token,
                    user: state.user,
                    organization: state.organization,
                }),
                storage: createJSONStorage(() => localStorage),
            },
        ),
    ),
);
