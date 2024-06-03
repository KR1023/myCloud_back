import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) 
        private userRepository: Repository<User>
    ){}

    async findUser(email: string){
        const result = await this.userRepository.findOne({
            where: {email}
        });
        return result;
    }

    createUser(user): Promise<User>{
        return this.userRepository.save(user);
    }

    async updateUser(email: string, _user: UpdateUserDto): Promise<User>{
        const user: User = await this.findUser(email);
        console.log(_user);
        user.username = _user.username;
        if(_user.password)
            user.password = bcrypt.hashSync(_user.password, 10);

        console.log(user);
        return this.userRepository.save(user);
    }

    deleteUser(email: string){
        return this.userRepository.delete({email});
    }

    async findByEmailOrSave(email, username, providerId): Promise<User>{
        const foundUser = await this.findUser(email);
        if(foundUser){
            return foundUser;
        }

        const newUser = await this.userRepository.save({
            email, username, providerId
        });

        return newUser;
    }
}
