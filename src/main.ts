import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import expressBasicAuth from 'express-basic-auth';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new ConfigService();
  app.use(
    ['/api'],
    expressBasicAuth({
      challenge: true,
      users: {
        [config.get<string>('SWAGGER_ADMIN_USER')]:
        config.get<string>('SWAGGER_ADMIN_PASSWORD')
      }
    })
  );

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
    exposedHeaders: ['Authorization'], // * 사용할 헤더 추가.
  });

  const swaggerConfig = new DocumentBuilder()
  .setTitle('D Day Attack')
  .setDescription('D Day Attack API description')
  .setVersion('1.0')
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    name: 'JWT',
    in: 'header'
  }, 'access-token')
  .addTag('auth')
  .addTag('users')
  .addTag('mails')
  .addTag('ddays')
  .addTag('alarms')
  .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(18080);
}
bootstrap();
