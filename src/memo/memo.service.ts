import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Memo } from './memo.entity';
import MemoCreateDto from './dto/memo.create.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class MemoService {
    constructor(
        @InjectRepository(Memo) 
        private memoRepository: Repository<Memo>
    ){}

    async createMemo(memo: MemoCreateDto, user: User): Promise<Memo>{
        const savingMemo = new Memo();
        savingMemo.subject = memo.subject;
        savingMemo.content = memo.content;
        savingMemo.tags = memo.tags;
        savingMemo.user = user;
        return await this.memoRepository.save(savingMemo);
    }

    async findMemo(memoId: number){
        return this.memoRepository.findOne({
            relations: {
                user: true
            },
            where: {
                memoId: memoId
            }
        });
    }

    async findMemoList(userEmail: string): Promise<Memo[]>{
        /*
        return await this.memoRepository
            .createQueryBuilder('memo')
            // .leftJoinAndSelect('memos.user', 'user')
            .where('memo.userEmail = :userEmail', {userEmail})
            .orderBy('memo.createdDt', 'DESC')
            .getMany();
        */
       return await this.memoRepository
            .query(`SELECT * 
                    FROM my_cloud.memo 
                    WHERE userEmail = '${userEmail}'
                    ORDER BY createdDt DESC;`);
    }
}