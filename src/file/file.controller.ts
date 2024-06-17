import { Controller, Get, Post, Body, Param, Response } from '@nestjs/common';
import { join, extname } from 'path';
import * as fs from 'fs';
import * as fs_promise from 'fs/promises';

@Controller('file')
export class FileController {
    
    @Post('/list/:userEmail')
    async getDirList(@Param("userEmail") userEmail: string, @Body() req, @Response() res){
        const defaultPath = join(__dirname, '../../uploads/explorer', userEmail);
        const { currDir } = req;

        let resList = [];

        try{
            if(!fs.existsSync(defaultPath)){
                fs.mkdirSync(defaultPath);
            }
            
            const dirList = fs.readdirSync(join(defaultPath, currDir), {withFileTypes: true});
            for(const el of dirList){
                const currEl = join(el.path, el.name);
                resList = resList.concat({"element" : el.name, "isDir": el.isDirectory(), "dirPath": el.path, "filePath": currEl, "ext": extname(currEl)});
            }

            return res.status(200).send(resList);
        }catch(e){
            console.error(e);
        }
    }
}
