import { Controller, Get, Post, Body, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { AuthenticatedGuard, LocalAuthGuard, GoogleAuthGuard, KakaoAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('register')
    async register(@Body() userDto: CreateUserDto){
        return await this.authService.register(userDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req){
        return req.user;
    }
    
    @Get('logout')
    logout(@Request() req, @Response() res){
        req.logout(() => {
            res.status(200).send({statusCode: 200, message: '로그아웃되었습니다.'});
        });
    }

    @UseGuards(AuthenticatedGuard)
    @Get('check-auth')
    testGuardWithSession(@Request() req){
        return req.user;
    }
 
    @Get('to-google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth(@Request() req) {}

    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Request() req, @Response() res){
        // const { user } = req;
        // return res.send(user)
        return res.redirect(process.env.FRONT_ADDRESS);

    }

    @Get('to-kakao')
    @UseGuards(KakaoAuthGuard)
    async kakaoAuth(@Request() req){}

    @Get('kakao')
    @UseGuards(KakaoAuthGuard)
    async kakaoAuthRedirect(@Request() req, @Response() res){
        // const { user } = req;
        // return res.send(user);
        return res.redirect(process.env.FRONT_ADDRESS);
    }
}
