import {
    getAccessToken,
    getUserInfo,
    openMediaPicker,
    openPhone,
    openWebview,
    saveImageToGallery,
} from "zmp-sdk";
import {
    authorize,
    followOA,
    getPhoneNumber,
    getSetting,
    openChat,
} from "zmp-sdk/apis";

export const zaloSdk = {
    getUserInfo,
    getAccessToken,
    followOA,
    openWebview,
    openMediaPicker,
    saveImageToGallery,
    openPhone,
    openChat,
    getSetting,
    authorize,
    getPhoneNumber,
};
