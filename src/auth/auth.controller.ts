import { Controller, Get, Post, Body, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { AuthenticatedGuard, LocalAuthGuard, LoginGuard, GoogleAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('register')
    async register(@Body() userDto: CreateUserDto){
        return await this.authService.register(userDto);
    }

    /*
    @Post('login')
    async login(@Request() req, @Response() res){
        const userInfo = await this.authService.validateUser(req.body.email, req.body.password);

        if(userInfo){
            res.cookie('login', JSON.stringify(userInfo), {
                httpOnly: false,
                // maxAge: 1000 * 60 * 60 * 24 * 1
                maxAge: 1000
            });
            return res.send({ message: 'login success'});
        }

        return res.send({message: 'check password'});
        
    }
    */

    @UseGuards(LoginGuard)
    @Post('login2')
    async login2(@Request() req, @Response() res){
        if(!req.cookies['login'] && req.user){
            res.cookie('login', JSON.stringify(req.user), {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 1
            });
        }

        return res.send({ message: 'login success2'});
    }

    @UseGuards(LoginGuard)
    @Get('test-guard')
    testGuard(){
        return '로그인 시 확인 가능'
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login3(@Request() req){
        return req.user;
    }

    @Get('logout')
    logout(@Request() req, @Response() res){
        req.logout(() => {
            
            res.send('로그아웃 되었습니다.');
        });
    }

    @UseGuards(AuthenticatedGuard)
    @Get('test-guard2')
    testGuardWithSession(@Request() req){
        return req.user;
    }
 
    @Get('to-google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth(@Request() req) {}

    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Request() req, @Response() res){
        const { user } = req;
        return res.send(user);
    }
}
