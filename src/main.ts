import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use(
    session({
        secret: 'zrIRob4EoDztItHsawVYxcQA74b2Bu3zayZrq5Kn9ueApOFbZP2Tvq4lQlX22EQzkUe1POdyovuBKdbUiiUROtibab9EoMvhah59',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 3600000}
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  /*
  app.enableCors({
    origin: true,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    credentials: true
  });
  */
 
  await app.listen(4000);
}

bootstrap();
