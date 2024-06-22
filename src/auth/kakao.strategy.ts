import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-kakao";
import { UserService } from "src/user/user.service";
import { User } from "src/user/user.entity";

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy){
    constructor(private userService: UserService){
        super({
            clientID: process.env.KAKAO_ID,
            clientSecret: process.env.KAKAO_PASS,
            callbackURL: `${process.env.RES_ADDR}/auth/kakao`,
            scope: ['profile_nickname']
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile){
        const email = `${profile.provider}_${profile._json.id}@mycloud.com`;
        const providerId = profile.id;
        const username = profile.displayName;
        
        const user:User = await this.userService.findByEmailOrSave(email, username, providerId);
        return user;
    }
}