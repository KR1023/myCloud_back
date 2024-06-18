import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { File } from './file.entity';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(File)
        private fileRepository: Repository<File>
    ){}

    async fileList(dirPath: string){
        console.log(dirPath);
        return await this.fileRepository.find({
            where: {
                destination: dirPath
            }
        });
    }

    async uploadFile(user: User, uploadedFile: Express.Multer.File): Promise<File>{
        const file = new File();
        file.originalName = uploadedFile.originalname;
        file.mimetype = uploadedFile.mimetype;
        file.destination = uploadedFile.destination;
        file.filename = uploadedFile.filename;
        file.path = uploadedFile.path;
        file.size = uploadedFile.size.toString();
        // file.user = user;
        return await this.fileRepository.save(file);
    }
}
