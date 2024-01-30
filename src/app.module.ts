import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [MailModule, 
    ConfigModule.forRoot({
    cache: true,
    isGlobal: true,
  })],
  exports: [MailModule]
})
export class AppModule {}
