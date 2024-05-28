import { Entity, Column, PrimaryColumn } from "typeorm";

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
}