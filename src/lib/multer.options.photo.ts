import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as fs_promise from 'fs/promises';

import { join, extname, basename } from 'path';

export const multerOption = {
    storage: diskStorage({
        destination: async (req, file, cb) => {
            try{
                const { userEmail } = req.body;
                if(!fs.existsSync(join(__dirname, '../../uploads/photo/', userEmail))){
                    await fs_promise.mkdir(join(__dirname, '../../uploads/photo/', userEmail));
                }
                // cb(null, process.env.MEMO_IMAGE_UPLOAD_PATH)
                cb(null, join(__dirname, '../..', 'uploads/photo/', userEmail));
            }catch(e){
                console.error(e);
            }
        },
        filename: (req, file, cb) => {
            const ext = extname(file.originalname);
            cb(null, `${basename(file.originalname, ext)}_${Date.now()}${ext}`);
        }
    })
}