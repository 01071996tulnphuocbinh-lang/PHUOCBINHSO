import { User } from "@dts";
import { ImageType } from "zmp-ui/image-viewer";
import { serviceContainer } from "application/services";
import { PickImageParams } from "domain/repositories";

export const getZaloUserInfo = async (): Promise<User> =>
    serviceContainer.getUserInfoUseCase.execute();

export const getToken = async (): Promise<string> =>
    serviceContainer.getAccessTokenUseCase.execute();

export const followOfficialAccount = async ({
    id,
}: {
    id: string;
}): Promise<void> => serviceContainer.followOAUseCase.execute({ id });

export const openWebView = async (link: string): Promise<void> =>
    serviceContainer.openWebViewUseCase.execute(link);

export const saveImage = async (img: string): Promise<void> =>
    serviceContainer.saveImageUseCase.execute(img);

export type { PickImageParams };

export interface UploadImageResponse {
    domain: string;
    images: string[];
}

export const pickImages = async (
    params: PickImageParams,
): Promise<(ImageType & { name: string })[]> =>
    serviceContainer.pickImagesUseCase.execute(params) as Promise<
        (ImageType & { name: string })[]
    >;
