import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'C01mb10*20240530',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize())
  app.use(passport.session())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true
    })
  )
  const config = new DocumentBuilder()
        .setTitle('API Sistema de Agendamiento de Clases para un Colegio')
        .setDescription('gestionar el agendamiento de clases en un colegio.')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
