import { User } from "src/user/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Photo{
    @PrimaryGeneratedColumn()
    photo_id: number;

    @Column()
    originalName: string;

    @Column()
    mimetype: string;

    @Column()
    destination: string;

    @Column()
    filename: string;

    @Column()
    path: string;

    @Column()
    size: string;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    uploadedDate: Date;

    @ManyToOne(() => User, (user) => user.photos, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    user: User;

}