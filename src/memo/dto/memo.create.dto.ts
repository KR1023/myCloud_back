import { IsString, IsEmail } from 'class-validator';

export default class MemoCreateDto{
    @IsString()
    subject: string;

    @IsString()
    content: string;

    @IsString()
    tags: string;

    @IsEmail()
    userEmail: string;
}
