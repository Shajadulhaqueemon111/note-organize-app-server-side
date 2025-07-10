/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import httpStatus from 'http-status';
import AppError from '../../error/app.error';
import config from '../../config';

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

// ✅ Upload image using buffer (works in Vercel)
export const sendImageToCloudinary = async (
  fileBuffer: Buffer,
  imageName: string,
) => {
  try {
    const result = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          public_id: imageName,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      stream.end(fileBuffer);
    });

    if (!result?.secure_url) {
      throw new Error('Image upload failed, secure_url not found');
    }

    return result;
  } catch (error) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Cloudinary image upload failed',
    );
  }
};

// ✅ Use memory storage (safe for Vercel)
const storage = multer.memoryStorage();
export const upload = multer({ storage });
