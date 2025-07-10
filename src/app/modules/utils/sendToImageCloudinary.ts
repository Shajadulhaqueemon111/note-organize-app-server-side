/* eslint-disable @typescript-eslint/no-unused-vars */
import { v2 as cloudinary } from 'cloudinary';

import multer from 'multer';

import httpStatus from 'http-status';
import fs from 'fs';

import AppError from '../../error/app.error';
import config from '../../config';
export const sendImageToCloudinary = async (
  path: string,
  imageName: string,
) => {
  cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
  });
  //   console.log('Cloudinary config:', {
  //     cloud_name: config.cloudinary_cloud_name,
  //     api_key: config.cloudinary_api_key,
  //     api_secret: config.cloudinary_api_secret,
  //   });

  try {
    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(path, {
      public_id: imageName,
    });

    // Check if the upload was successful
    if (!uploadResult?.secure_url) {
      throw new Error('Image upload failed, secure_url not found');
    }

    // Optionally: Apply transformations for optimization
    const optimizeUrl = cloudinary.url(uploadResult.public_id, {
      fetch_format: 'auto',
      quality: 'auto',
    });
    console.log(optimizeUrl);

    const autoCropUrl = cloudinary.url(uploadResult.public_id, {
      crop: 'auto',
      gravity: 'auto',
      width: 500,
      height: 500,
    });

    console.log('Auto-Cropped Image URL:', autoCropUrl);
    //unnessary asycronuis local machineta take deleted function
    fs.unlink(path, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('file is deleted');
      }
    });

    // Return the secure URL of the uploaded image

    return uploadResult; // This will contain the `secure_url`
  } catch (error) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Cloudinary image upload failed',
    );
  }
};

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/'); // Current directory for file storage
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
