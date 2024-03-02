import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';


@Injectable()
export class MailService {
  constructor(private readonly config: ConfigService) {}
  private readonly logger = new Logger(MailService.name);

  /**
   * . Send mail by Brevo API
   *  */ 
  sendMail() {
    // 사용할 모듈 가져오기
    const SibApiV3Sdk = require('sib-api-v3-typescript');
 
    // API 인증 정보 설정
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let apiKey = apiInstance.authentications['apiKey'];
    apiKey.apiKey = this.config.get<String>('MAIL_API_KEY');

    // 메일 발송 정보 설정
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); 
    const senderEmail = this.config.get<String>('SENDER_MAIL');

    sendSmtpEmail.subject = "{{params.subject}}";
    sendSmtpEmail.htmlContent = "<html><body><h1>This is my first transactional email</h1><p>{{params.parameter}}</p></body></html>";
    sendSmtpEmail.sender = {"name":"spacekay","email":senderEmail};
    sendSmtpEmail.to = [{"email":this.config.get<String>('TEST_MAIL_1'),"name":"jk1"}];
    sendSmtpEmail.cc = [{"email":this.config.get<String>('TEST_MAIL_2'),"name":"jk2"}];
    sendSmtpEmail.replyTo = {"email":senderEmail,"name":"spacekay"};
    sendSmtpEmail.params = {"parameter":"spacekay spacekay","subject":"Brevo API sending test"};

    // 메일 발송 결과 확인
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data: any) {
      console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    }, function(error: any) {
      console.error(error);
    });

    return 'Your mail is successfully sent.';
  }

}
