import { Controller, Get, Post, Body, Patch, Delete, Param, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Get('/:email')
    async findUser(@Param('email') email: string){
        return await this.userService.findUser(email);
    }

    @Post('/')
    createUser(@Body() user: CreateUserDto){
        return this.userService.createUser(user);
    }

    @Patch('/:email')
    updateUser(@Param('email') email: string, @Body() user: UpdateUserDto){
        console.log(user);
        return this.userService.updateUser(email, user);
    }

    @Delete('/:email')
    async deleteUser(@Request() req, @Param('email') email: string){
        req.logout(() => {});
        return await this.userService.deleteUser(email);
    }
}
