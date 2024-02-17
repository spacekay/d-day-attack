import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { LoginRequestDto } from './dto/login.request.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { LoginService } from './login.service';

@ApiTags('auth')
@Controller('login')
export class LoginController {

    constructor(private readonly loginService: LoginService) {}

    @ApiCreatedResponse({type: LoginResponseDto})
    @Post()
    async login(@Body() request: LoginRequestDto): Promise<LoginResponseDto> {
        return this.loginService.login(request.email, request.password);
    }

}
