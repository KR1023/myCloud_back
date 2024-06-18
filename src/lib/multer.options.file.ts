import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as fs_promise from 'fs/promises';

import { join, extname, basename } from 'path';

export const multerOption = {
    storage: diskStorage({
        destination: async (req, file, cb) => {
            try{
                const { userEmail, currDir } = req.body;
                if(!fs.existsSync(join(__dirname, '../../uploads/explorer/', userEmail))){
                    await fs_promise.mkdir(join(__dirname, '../../uploads/explorer/', userEmail));
                }
                // cb(null, process.env.MEMO_IMAGE_UPLOAD_PATH)
                cb(null, join(__dirname, '../..', 'uploads/explorer/', userEmail, currDir));
            }catch(e){
                console.error(e);
            }
        },
        filename: (req, file, cb) => {
            const { userEmail, currDir } = req.body;
            let filename = file.originalname;
            if(fs.existsSync(join(__dirname, '../../uploads/explorer', userEmail, currDir, file.originalname))){
                filename = `${Date.now()}_${file.originalname}`;
            }
            cb(null, filename);
        }
    })
}