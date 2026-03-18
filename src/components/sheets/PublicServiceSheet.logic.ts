import {
    PUBLIC_SERVICE_DATA_MAP,
    PublicServiceSection,
    PublicServiceSheetType,
} from "./PublicServiceSheet.data";

export const getPublicServiceSection = (
    type: PublicServiceSheetType,
): PublicServiceSection => PUBLIC_SERVICE_DATA_MAP[type] || PUBLIC_SERVICE_DATA_MAP.public;
