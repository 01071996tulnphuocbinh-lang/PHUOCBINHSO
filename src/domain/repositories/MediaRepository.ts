import { UploadedImage } from "domain/types/UploadedImage";

export interface PickImageParams {
    maxItemSize?: number;
    maxSelectItem?: number;
    serverUploadUrl: string;
}

export interface MediaRepository {
    saveImage(img: string): Promise<void>;
    pickImages(params: PickImageParams): Promise<UploadedImage[]>;
}
