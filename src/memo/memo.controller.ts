import { Controller, Get, Post, Patch, Delete, Body, Param, Request } from '@nestjs/common';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MemoService } from './memo.service';
import { CreateMemoDto, UpdateMemoDto } from './dto/memo.dto';
import { UserService } from 'src/user/user.service';
import { Memo } from './memo.entity';
import { multerOption } from 'src/lib/multer.options.memo';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Controller('memo')
export class MemoController {
    constructor(private memoService: MemoService, private userService:UserService, private configService: ConfigService){}

    @Post()
    async createMemo(@Body() memo:CreateMemoDto): Promise<Memo>{
        try{
            // return this.memoService.createMemo(memo);
            const user = await this.userService.findUser(memo.userEmail);
            return await this.memoService.createMemo(memo, user);
            /// return {message: "creating memo is successful", subject: response.subject};
        }catch(e){
            console.error(e);
        }
    }

    @Post('/list')
    async findMemoList(@Body() req): Promise<Memo[]>{
        try{
            const { userEmail, searchText } = req;
            return this.memoService.findMemoList(userEmail, searchText);
        }catch(e){
            console.error(e);
        }
    }

    @Get(":memo_id")
    async findMemo(@Param("memo_id") memo_id: string){
        try{
            return this.memoService.findMemo(parseInt(memo_id));
        }catch(e){
            console.error(e);
        }
    }

    @Patch(":memo_id")
    async updateMemo(@Param("memo_id") memoId: string, @Body() updateObj: UpdateMemoDto){
        try{
            return this.memoService.updateMemo(parseInt(memoId), updateObj);
        }catch(e){
            console.error(e);
        }
    }

    @Delete(":memo_id")
    async deleteMemo(@Param("memo_id") memo_id: string): Promise<any>{
        try{
            await this.memoService.deleteMemo(parseInt(memo_id));
            return {message: "memo is deleted.", memo_id};
        }catch(e){
            console.error(e);
        }
    }

    @Post('/upload')
    @UseInterceptors(FileInterceptor('file', multerOption))
    fileUpload(@UploadedFile() file: Express.Multer.File){
        try{
            // const IMG_URL = `${process.env.MEMO_IMAGE_UPLOAD_PATH}\\${file.filename}`;
            // const IMG_URL = `${join(__dirname, '../..', 'uploads')}/${file.filename}`;
            const IMG_URL = `${this.configService.get('RES_ADDR')}/uploads/memo/${file.filename}`;
            return ({url: IMG_URL});
        }catch(e){
            console.error(e);
        }
    }
}
