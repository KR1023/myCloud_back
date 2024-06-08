import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateMemoDto{
    @IsString()
    subject: string;

    @IsOptional()
    @IsString()
    content: string;

    @IsOptional()
    @IsString()
    tags: string;

    @IsEmail()
    userEmail: string;
}

export class UpdateMemoDto{
    @IsOptional()
    @IsString()
    subject: string;

    @IsOptional()
    @IsString()
    content: string;

    @IsOptional()
    @IsString()
    tags: string;
}