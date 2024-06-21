import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MemoModule } from './memo/memo.module';
import { Memo } from './memo/memo.entity';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PhotoModule } from './photo/photo.module';
import { Photo } from './photo/photo.entity';
import { File } from './file/file.entity';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', 'uploads'),
        serveRoot: '/uploads'
    }),
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: process.env.HOST,
        port: parseInt(process.env.PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [User, Memo, Photo],
        synchronize: true,
        logging: true
    }),
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    MemoModule,
    PhotoModule,
    FileModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
