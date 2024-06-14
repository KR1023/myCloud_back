import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class PhotoService {
    constructor(
        @InjectRepository(Photo)
        private photoRepository: Repository<Photo>
    ){}

    async uploadPhotos(user: User, file: Express.Multer.File): Promise<Photo>{
        const photo = new Photo();
        photo.originalName = file.originalname;
        photo.mimetype = file.mimetype;
        photo.destination = file.destination;
        photo.filename = file.filename;
        photo.path = file.path;
        photo.size = file.size.toString();
        photo.user = user;
        return await this.photoRepository.save(photo);
    }

    async getPhotoList(userEmail: string): Promise<Photo[]>{
        return this.photoRepository
            .query(`SELECT *
                    FROM my_cloud.photo
                    WHERE userEmail = '${userEmail}'
                    ORDER BY uploadedDate DESC`);
    }
}
