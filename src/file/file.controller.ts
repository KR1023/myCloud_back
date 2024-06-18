import { Controller, Get, Post, Patch, Body, Param, Response, HttpException, HttpStatus, UseInterceptors, UploadedFile, Header } from '@nestjs/common';
import { StreamableFile } from '@nestjs/common';
import { join, basename, extname } from 'path';
import * as fs from 'fs';
import * as fs_promise from 'fs/promises';
import { multerOption } from 'src/lib/multer.options.file';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { UserService } from 'src/user/user.service';

@Controller('file')
export class FileController {
    constructor(private fileService: FileService, private userService: UserService){}
    
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

    @Patch('rename')
    async renameFile(@Body() req, @Response() res){
        const { oldPath, dirPath, newName } = req;
        try{
           await fs_promise.rename(oldPath, join(dirPath, newName));
            return res.status(200).send({message: 'name is changed.'});
        }catch(e){
            console.error(e);
            if(e.code === 'ENOENT'){
                e.message = 'target is not found.';
                return res.status(404).send(e.message);
            }

            return res.status(500).send(e.message);
        }
    }

    @Post('/upload')
    @UseInterceptors(FileInterceptor('file', multerOption))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() req, @Response() res){
        // const { userEmail } = req;
        // const user = await this.userService.findUser(userEmail);

        try{
            // if(file)
            //     this.fileService.uploadFile(user, file);
            return res.status(200).send('upload success');
        }catch(e){
            console.error(e);
            return res.status(500).send(e.message);
        }
    }

    @Post('/download')
    @Header('Content-Disposition', 'attachement;')
    async downloadFile(@Body() req): Promise<StreamableFile>{
        const { filePath } = req;
        const file = fs.createReadStream(filePath);
        return new StreamableFile(file);
    }

}
