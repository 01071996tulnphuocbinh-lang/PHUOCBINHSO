import { MediaRepository, PickImageParams } from "domain/repositories";
import { UploadedImage } from "domain/types/UploadedImage";
import { zaloSdk } from "infrastructure/sdk/zalo.sdk";

interface UploadImageResponse {
    domain: string;
    images: string[];
}

export class MediaRepositoryImpl implements MediaRepository {
    async saveImage(img: string): Promise<void> {
        await zaloSdk.saveImageToGallery({ imageBase64Data: img });
    }

    async pickImages(params: PickImageParams): Promise<UploadedImage[]> {
        const res = await zaloSdk.openMediaPicker({
            type: "photo",
            maxItemSize: params.maxItemSize || 1024 * 1024,
            maxSelectItem: params.maxSelectItem || 1,
            serverUploadUrl: params.serverUploadUrl,
        });

        const parsed = JSON.parse(res.data || "{}");
        const payload = (parsed.data || {}) as UploadImageResponse;
        const domain = payload.domain || "";
        const images = payload.images || [];

        return images.map(image => ({
            src: `${domain}${image}`,
            name: image,
        }));
    }
}
