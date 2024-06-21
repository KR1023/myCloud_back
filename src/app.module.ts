import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
            type: 'mysql',
            host: configService.get('DB_HOST'),
            port: parseInt(configService.get('DB_PORT')),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_DATABASE'),
            entities: [User, Memo, Photo],
            synchronize: true,
            logging: true
        })
    }),
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
        isGlobal: true
    }),
    MemoModule,
    PhotoModule,
    FileModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
