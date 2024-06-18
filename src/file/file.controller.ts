import { Controller, Get, Post, Body, Param, Response, HttpException, HttpStatus } from '@nestjs/common';
import { join, basename, extname } from 'path';
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

    @Post('/create-dir')
    async createDir(@Body() req, @Response() res){
        const { userEmail, currDir, dirName } = req;

        try{
            const defaultPath = join(__dirname, '../../uploads/explorer', userEmail, currDir);
            if(!fs.existsSync(join(defaultPath, dirName))){

                fs.mkdirSync(join(defaultPath, dirName))
                return res.status(200).send({"message" : "dir is created"});
            }else{
                throw new HttpException('Already Exists', HttpStatus.CONFLICT);
            }
            
        }catch(e){
            console.error(e);
            return res.status(e.status).send(e.message);
        }
    }

    @Post('/file-attr')
    async getFileAttr(@Body() req, @Response() res){
        const { filePath } = req;
        
        try{
            const filename = basename(filePath);
            // const fileAttr = fs.readdirSync(filePath, { withFileTypes: true});
            const fileAttr = fs.statSync(filePath);
            const { size, mtime, ctime, birthtime } = fileAttr;
            const resAttr = {"filename": filename, size, birthtime, mtime, ctime};
            return res.status(200).send(resAttr);
        }catch(e){
            console.error(e);
            if(e.code === 'ENOENT'){
                e.message = "file or directory is not found."
                return res.status(404).send(e.message);
            }
            return res.status(500).send(e.message);
        }
    }
}
