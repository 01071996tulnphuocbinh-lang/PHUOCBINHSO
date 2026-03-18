import { serviceContainer } from "application/services";
import { PickImageParams } from "domain/repositories";
import { UploadedImage } from "domain/types/UploadedImage";

export const saveImageToDevice = (image: string): Promise<void> =>
    serviceContainer.saveImageUseCase.execute(image);

export const pickImagesFromDevice = (
    params: PickImageParams,
): Promise<UploadedImage[]> => serviceContainer.pickImagesUseCase.execute(params);
