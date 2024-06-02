import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity()
export class Memo {
    @PrimaryGeneratedColumn()
    memoId: number;

    @Column()
    subject: string;

    @Column()
    content: string;

    @Column()
    tags: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createdDt: Date = new Date();

    @Column({ type: 'datetime', nullable: true})
    updatedDt: Date;

    @ManyToOne(() => User, (user) => user.memos)
    user: User;
}