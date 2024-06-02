import { Controller, Get, Post, Body } from '@nestjs/common';
import { MemoService } from './memo.service';
import MemoCreateDto from './dto/memo.create.dto';
import { UserService } from 'src/user/user.service';

@Controller('memo')
export class MemoController {
    constructor(private memoService: MemoService, private userService:UserService){}

    @Post()
    async createMemo(@Body() memo:MemoCreateDto): Promise<any>{
        // return this.memoService.createMemo(memo);
        const user = await this.userService.findUser(memo.userEmail);
        const response = await this.memoService.createMemo(memo, user);
        return {message: "creating memo is successful", subject: response.subject};
    }
}
