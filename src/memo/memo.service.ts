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
        try{
            const savingMemo = new Memo();
            savingMemo.subject = memo.subject;
            savingMemo.content = memo.content;
            savingMemo.tags = memo.tags;
            savingMemo.user = user;
            return await this.memoRepository.save(savingMemo);
        }catch(e){
            console.error(e);
        }
        
    }

    async findMemo(memoId: number){
        try{
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
        }catch(e){
            console.error(e);
        }
    }

    async findMemoList(userEmail: string, searchText: string): Promise<Memo[]>{
        try{
        /*  
        return await this.memoRepository
            .createQueryBuilder('memo')
            // .leftJoinAndSelect('memos.user', 'user')
            .where('memo.userEmail = :userEmail', {userEmail})
            .orderBy('memo.createdDt', 'DESC')
            .getMany();
        */
            if(searchText){
                return await this.memoRepository
                    .query(`SELECT * 
                            FROM my_cloud.memo
                            WHERE userEmail = '${userEmail}' AND
                                subject LIKE ('%${searchText}%') OR content LIKE ('%${searchText}%')
                            ORDER BY createdDt DESC;`);
               }else{
                return await this.memoRepository
                    .query(`SELECT * 
                            FROM my_cloud.memo 
                            WHERE userEmail = '${userEmail}'
                            ORDER BY createdDt DESC;`);
               }
        }catch(e){
            console.error(e);
        }
    }

    async updateMemo(memoId: number, updateObj: UpdateMemoDto): Promise<Memo>{
        try{
            const orgMemo = await this.findMemo(memoId);

            orgMemo.subject = updateObj.subject;
            orgMemo.content = updateObj.content;
            orgMemo.tags = updateObj.tags;
            orgMemo.updatedDt = new Date();
            
            this.memoRepository.save(orgMemo);
            return orgMemo;
        }catch(e){
            console.error(e);
        }
    }

    async deleteMemo(memoId: number): Promise<void>{
        try{
            this.memoRepository.delete(memoId);
        }catch(e){
            console.error(e);
        }
    }
}