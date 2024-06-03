import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { MemoService } from './memo.service';
import { CreateMemoDto, UpdateMemoDto } from './dto/memo.dto';
import { UserService } from 'src/user/user.service';
import { Memo } from './memo.entity';

@Controller('memo')
export class MemoController {
    constructor(private memoService: MemoService, private userService:UserService){}

    @Post()
    async createMemo(@Body() memo:CreateMemoDto): Promise<any>{
        // return this.memoService.createMemo(memo);
        const user = await this.userService.findUser(memo.userEmail);
        const response = await this.memoService.createMemo(memo, user);
        return {message: "creating memo is successful", subject: response.subject};
    }

    @Get()
    async findMemoList(@Body() reqData): Promise<Memo[]>{
        return this.memoService.findMemoList(reqData.userEmail);
    }

    @Get(":memo_id")
    async findMemo(@Param("memo_id") memo_id: string){
        return this.memoService.findMemo(parseInt(memo_id));
    }

    @Patch(":memo_id")
    async updateMemo(@Param("memo_id") memoId: string, @Body() updateObj: UpdateMemoDto){
        return this.memoService.updateMemo(parseInt(memoId), updateObj);
    }

    @Delete(":memo_id")
    async deleteMemo(@Param("memo_id") memo_id: string): Promise<any>{
        await this.memoService.deleteMemo(parseInt(memo_id));
        return {message: "memo is deleted.", memo_id};
    }
}
