import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Memo } from './memo.entity';
import { CreateMemoDto, UpdateMemoDto } from './dto/memo.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class MemoService {
    constructor(
        @InjectRepository(Memo) 
        private memoRepository: Repository<Memo>
    ){}

    async createMemo(memo: CreateMemoDto, user: User): Promise<Memo>{
        const savingMemo = new Memo();
        savingMemo.subject = memo.subject;
        savingMemo.content = memo.content;
        savingMemo.tags = memo.tags;
        savingMemo.user = user;
        return await this.memoRepository.save(savingMemo);
    }

    async findMemo(memoId: number){
        return this.memoRepository.findOne({
            where: {
                memoId: memoId
            }
        });
       /*
       return this.memoRepository
            .createQueryBuilder("memo")
            .where('memo.memoId = :memoId', {memoId})
            .getOne();
        */  
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

    async updateMemo(memoId: number, updateObj: UpdateMemoDto): Promise<Memo>{
        const orgMemo = await this.findMemo(memoId);

        orgMemo.subject = updateObj.subject;
        orgMemo.content = updateObj.content;
        orgMemo.tags = updateObj.tags;
        orgMemo.updatedDt = new Date();
        
        this.memoRepository.save(orgMemo);
        return orgMemo;
    }

    async deleteMemo(memoId: number): Promise<void>{
        this.memoRepository.delete(memoId);
    }
}