import express from 'express';
import multer from 'multer';

import cloudinaryES6 from 'cloudinary';
const cloudinary = cloudinaryES6.v2;
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: function (req, file) {
    console.log(file.mimetype);
    let folder;
    let allowed_formats;
    let resource_type;
    if (file.mimetype.startsWith('image')) {
      folder = 'images';
      allowed_formats = ['jpeg', 'png', 'jpg', 'svg'];
    } else if (
      file.mimetype.startsWith('application') ||
      file.mimetype.startsWith('text')
    ) {
      folder = 'documents';
      // allowed_formats = ['doc', 'docx', 'pdf', 'txt'];
      resource_type = 'raw';
    }
    return {
      folder,
      allowed_formats: allowed_formats,
      resource_type: resource_type,
      transformation: [{ width: 400, height: 400, crop: 'limit' }],
    };
  },
});

const upload = multer({ storage });

router.post('/', upload.single('file'), (req, res) => {
  const uploadFileURL = `/${req.file.path}`;
  res.send(uploadFileURL);
});

export default router;
