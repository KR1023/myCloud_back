import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { UserService } from "src/user/user.service";
import { User } from "src/user/user.entity";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy){
    constructor(private userService: UserService){
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.RES_ADDR}/auth/google`,
            scope: ['email', 'profile']
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile){
        const{id, name, emails} = profile;
        const providerId = id;
        const email = emails[0].value;

        const user:User = await this.userService.findByEmailOrSave(email, name.givenName + ' ' + name.familyName, providerId);

        return user;
    }
}