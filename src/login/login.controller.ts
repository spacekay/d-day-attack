import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';

@ApiTags('auth')
@Controller('login')
export class LoginController {

    constructor(private readonly loginService: LoginService) {}

    @Post()
    login(@Body() request: LoginDto) {
        return this.loginService.login(request.email, request.password);
    }

}
