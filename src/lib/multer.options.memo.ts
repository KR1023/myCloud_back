import { diskStorage } from 'multer';

import { join, extname, basename } from 'path';

export const multerOption = {
    storage: diskStorage({
        destination: async (req, file, cb) => {
            // cb(null, process.env.MEMO_IMAGE_UPLOAD_PATH)
            cb(null, join(__dirname, '../..', 'uploads/memo'));
        },
        filename: (req, file, cb) => {
            file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
            const ext = extname(file.originalname);
            cb(null, `${basename(file.originalname, ext)}_${Date.now()}${ext}`);
        }
    })
}