import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MailService } from './mail.service';

@ApiTags('mails')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('access-token')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('test')
  sendMail() {
    return this.mailService.sendMail();
  }

}
