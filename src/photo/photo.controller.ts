import { Controller, Get, Post, Delete, Body, Param, Request, Header, StreamableFile } from '@nestjs/common';
import { UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOption } from 'src/lib/multer.options.photo';
import * as fs_promise from 'fs/promises';
import * as fs from 'fs';
import { PhotoService } from './photo.service';
import { UserService } from 'src/user/user.service';
import { Photo } from './photo.entity';
import { join } from 'path';
import * as JSZip from 'jszip';

@Controller('photo')
export class PhotoController {
    constructor(private photoService: PhotoService, private userService: UserService){}


    @Post('/upload/test')
    @UseInterceptors(FileInterceptor('photo', multerOption))
    uploadTest(@UploadedFile() file: Express.Multer.File){
        fs_promise.readFile(file.path).then((data) => {
            const meta = fs.statSync(file.path);
        })
        return file;
    }

    @Post('/upload/photos')
    @UseInterceptors(FilesInterceptor('photo', 50, multerOption))
    async uploadPhotos(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body: any){
        const { userEmail } = body;
        const user = await this.userService.findUser(userEmail);
        
        for(const file of files){
            try{
                this.photoService.uploadPhotos(user, file);
            }catch(e){
                console.error(e);
            }
        }
        return files;
    }

    @Get('/list/:userEmail')
    getPhotoList(@Param("userEmail") userEmail, @Request() req): Promise<Photo[]>{
        const { startDate, endDate } = req.query;
        return this.photoService.getPhotoList(userEmail, startDate, endDate);
    }

    @Get('/download/:photo_id')
    @Header('Content-Type', 'application/jpeg')
    @Header('Content-Disposition', 'attachement;')
    async downloadPhoto(@Param('photo_id') photo_id): Promise<StreamableFile>{
        const photo = await this.photoService.getPhotoInfo(parseInt(photo_id));
        const photoPath = photo.path;
        // const file = fs.createReadStream(join(__dirname, '../../uploads/photo/test@mycloud.com/vanilla_js_1718415109288.png'));
        const file = fs.createReadStream(photoPath);
        return new StreamableFile(file);
    }

    @Post('/download/photos')
    @Header('Content-Type', 'application/zip')
    @Header('Content-Disposition', 'attachement;')
    async downloadPhotos(@Body() req): Promise<StreamableFile>{
        const timer = ms => new Promise(res => setTimeout(res, ms));

        const zip = new JSZip();
        const userEmail = req.userEmail;
        const photoIdArr = req.idList;
        const photos = await this.photoService.getPhotosInfo(photoIdArr);

        const zipPath = join(__dirname, '../../uploads/photo', userEmail, 'photos.zip');

        for(const photo of photos){
            zip.file(photo.filename, fs.readFileSync(photo.path));
        }
        
            zip
            .generateNodeStream({streamFiles: true})
            .pipe(fs.createWriteStream(zipPath))
            .on('finish', async () => {
                console.log(new Date().toLocaleString(), 'photos.zip is written.');
            });

            await timer(1000);
            const resZip = fs.createReadStream(zipPath);
            return new StreamableFile(resZip);
    }

    @Delete('/delete/:photo_id')
    async deletePhoto(@Param('photo_id') photo_id: string): Promise<any>{
        const filePath = await this.photoService.deletePhoto(parseInt(photo_id));
        fs_promise.rm(filePath)
            .then(() => {
                console.log(`${filePath} is deleted.`);
            });
        return {code: 201, message: 'delete success'};
    }

    @Post('/delete-photos')
    async deletePhotos(@Body() req): Promise<any>{
        const idList = req;
        try{
            const photos = await this.photoService.getPhotosInfo(idList);
            for(const photo of photos){
                const photoPath = photo.path;
                await fs_promise.rm(photoPath);
            }
            
            return this.photoService.deletePhotos(idList);
        }catch(e){
            console.error(e);
            return {"code": 500, message: "Internal Server Error"};
        }
    }
}
