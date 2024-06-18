import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';

@Entity()
export class File{
    @PrimaryGeneratedColumn()
    fileId: number;

    @Column()
    originalName: string;

    @Column()
    mimetype: string;

    @Column({type: 'text'})
    destination: string;

    @Column()
    filename: string;

    @Column({type: 'text'})
    path: string;

    @Column()
    size: string;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    uploadedDate: Date;
}