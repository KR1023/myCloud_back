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

@Module({
  imports: [
    ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', 'uploads'),
        serveRoot: '/uploads'
    }),
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'xhdtls12',
        database: 'my_cloud',
        entities: [User, Memo, Photo],
        synchronize: true,
        logging: true
    }),
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    MemoModule,
    PhotoModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
