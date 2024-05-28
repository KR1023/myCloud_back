import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'xhdtls12',
        database: 'my_cloud',
        entities: [User],
        synchronize: true,
        logging: true
    }),
    UserModule,
    AuthModule,
    ConfigModule.forRoot()
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
