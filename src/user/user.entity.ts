import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Memo } from '../memo/memo.entity';
import { Photo } from "src/photo/photo.entity";

@Entity()
export class User{
    @PrimaryColumn({ unique: true})
    email: string;
    
    @Column()
    username: string;

    @Column({ nullable: true})
    password: string;
    
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createdDt: Date = new Date();

    @Column({nullable: true})
    providerId: string;

    @OneToMany(() => Memo, (memo) => memo.user)
    memos: Memo[];

    @OneToMany(() => Photo, (photo) => photo.user)
    photos: Photo[];
}