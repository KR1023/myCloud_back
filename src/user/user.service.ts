import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
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
        try{
            const result = await this.userRepository.findOne({
                where: {email}
            });
            return result;
        }catch(e){
            console.error(e);
        }
    }

    createUser(user): Promise<User>{
        try{
            return this.userRepository.save(user);
        }catch(e){
            console.error(e);
        }
    }

    async updateUser(email: string, _user: UpdateUserDto): Promise<User>{
        try{
            const user: User = await this.findUser(email);
            console.log(_user);
            user.username = _user.username;
            if(_user.password)
                user.password = bcrypt.hashSync(_user.password, 10);
    
            console.log(user);
            return this.userRepository.save(user);
        }catch(e){
            console.error(e);
        }
    }

    deleteUser(email: string): Promise<DeleteResult>{
        try{
            return this.userRepository.delete({email});
        }catch(e){
            console.error(e);
        }
    }

    async findByEmailOrSave(email, username, providerId): Promise<User>{
        try{
            const foundUser = await this.findUser(email);
            if(foundUser){
                return foundUser;
            }
    
            const newUser = await this.userRepository.save({
                email, username, providerId
            });
    
            return newUser;
        }catch(e){
            console.error(e);
        }
    }
}
