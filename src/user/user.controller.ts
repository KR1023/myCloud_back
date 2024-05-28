import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
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

    @Put('/:email')
    updateUser(@Param('email') email: string, @Body() user: UpdateUserDto){
        console.log(user);
        return this.userService.updateUser(email, user);
    }

    @Delete('/:email')
    deleteUser(@Param('email') email: string){
        return this.userService.deleteUser(email);
    }
}
