import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { MailModule } from './mail/mail.module';
import { UserModule } from './user/user.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ 
    ConfigModule.forRoot({
    cache: true,
    isGlobal: true,
  }),
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => ({
      uri: config.get<string>('MONGODB_URL'),
    }),
    inject: [ConfigService],
  }),
  MailModule, UserModule, LoginModule],
  exports: [MailModule, UserModule]
})
export class AppModule {}
