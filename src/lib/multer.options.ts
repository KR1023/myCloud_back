import { diskStorage } from 'multer';
import { join, extname, basename } from 'path';

export const multerOption = {
    storage: diskStorage({
        destination: (req, file, cb) => {
            // cb(null, process.env.MEMO_IMAGE_UPLOAD_PATH)
            cb(null, join(__dirname, '../..', 'uploads'));
        },
        filename: (req, file, cb) => {
            const ext = extname(file.originalname);
            cb(null, `${basename(file.originalname, ext)}_${Date.now()}${ext}`);
        }
    })
}