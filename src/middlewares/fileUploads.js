import fs from 'fs';
import formidable from 'formidable';
import cloudinary from '../libs/cloudinary.js';

const form = formidable({
  uploadDir: 'temp',
});

const uploadPhoto = async (req, res, next) => {
  let filePath = null;
  try {
    const formRes = await form.parse(req);

    if (!Object.keys(formRes[1]).length) {
      req.files = null;
      return next();
    }

    filePath = formRes[1].displayPhoto[0].filepath;

    // upload to cloud storage
    const cloudinaryRes = await cloudinary.uploader.upload(filePath, {
      folder: '30_days_challenge',
    });

    req.files = { displayPhoto: cloudinaryRes.secure_url };

    // delete image from temporary folder
    fs.unlinkSync(filePath);

    return next();
  } catch (error) {
    if (filePath) {
      fs.unlinkSync(filePath);
    }
    return next(error);
  }
};

// eslint-disable-next-line import/prefer-default-export
export { uploadPhoto };
