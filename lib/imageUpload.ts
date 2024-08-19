import { uploadFile } from '@uploadcare/upload-client';
import imageCompression from 'browser-image-compression';

export const imageUpload = async (image: File) => {
    try {
        const options = {
            maxWidthOrHeight: 300,
            useWebWorker: true,
            maxSizeMB: 0.1, // Set maximum size to 100KB (adjust as necessary)
            initialQuality: 0.7, // Adjust the quality to reduce the file size
            fileType: 'image/webp', // Ensure the output format is WebP
        };

        const compressedImage = await imageCompression(image, options);

        const response = await uploadFile(compressedImage, {
            publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY as string,
        });

        return { error: null, imageUrl: `https://ucarecdn.com/${response.uuid}/` };
    } catch (error) {
        console.log(error);
        return { error: 'Something went wrong', imageUrl: null };
    }
};
