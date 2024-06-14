import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOption } from 'src/lib/multer.options.photo';
import * as fs_promise from 'fs/promises';
import * as fs from 'fs';
import { PhotoService } from './photo.service';
import { UserService } from 'src/user/user.service';
import { join } from 'path';

@Controller('photo')
export class PhotoController {
    constructor(private photoService: PhotoService, private userService: UserService){}

    @Post('/upload/test')
    @UseInterceptors(FileInterceptor('photo', multerOption))
    uploadTest(@UploadedFile() file: Express.Multer.File){
        console.log(file);
        fs_promise.readFile(file.path).then((data) => {
            const meta = fs.statSync(file.path);
            console.log(meta);
        })
        return file;
    }

    @Post('/upload/photos')
    @UseInterceptors(FilesInterceptor('photo', 50, multerOption))
    async uploadPhotos(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body: any){
        console.log(files);
        const { userEmail } = body;
        console.log(userEmail);
        const user = await this.userService.findUser(userEmail);
        
        for(const file of files){
            try{
                console.log('file', file);
                this.photoService.uploadPhotos(user, file);
            }catch(e){
                console.error(e);
            }
        }
        return files;
    }
}
