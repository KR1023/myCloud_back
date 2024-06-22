import { Controller, Get, Post, Body, Patch, Delete, Param, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Get('/:email')
    async findUser(@Param('email') email: string){
        try{
            return await this.userService.findUser(email);
        }catch(e){
            console.error(e);
        }
    }

    @Post('/')
    createUser(@Body() user: CreateUserDto){
        try{
            return this.userService.createUser(user);
        }catch(e){
            console.error(e);
        }
    }

    @Patch('/:email')
    updateUser(@Param('email') email: string, @Body() user: UpdateUserDto){
        console.log(user);
        try{
            return this.userService.updateUser(email, user);    
        }catch(e){
            console.error(e);
        }
    }

    @Delete('/:email')
    async deleteUser(@Request() req, @Param('email') email: string){
        try{
            req.logout(() => {});
            return await this.userService.deleteUser(email);    
        }catch(e){
            console.error(e);
        }
    }
}
