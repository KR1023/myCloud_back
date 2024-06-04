import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity()
export class Memo {
    @PrimaryGeneratedColumn()
    memoId: number;

    @Column({type: "varchar", length: 100})
    subject: string;

    @Column({type: "text", nullable: true})
    content: string;

    @Column({nullable: true})
    tags: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createdDt: Date = new Date();

    @Column({ type: 'datetime', nullable: true})
    updatedDt: Date;

    @ManyToOne(() => User, (user) => user.memos, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    user: User;
}