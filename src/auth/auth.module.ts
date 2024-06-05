import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serialize';
import { GoogleStrategy } from './google.strategy';
import { KakaoStrategy } from './kakao.strategy';

@Module({
    imports: [UserModule, PassportModule.register({session: true})],
    providers: [AuthService, LocalStrategy, SessionSerializer, GoogleStrategy, KakaoStrategy],
  controllers: [AuthController]
  
})
export class AuthModule {}
