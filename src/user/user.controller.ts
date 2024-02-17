import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserSignUpDto } from './dto/user.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiResponse({type: UserResponseDto})
    @Get(':email')
    async getUser(@Param('email') email: string) : Promise<UserResponseDto> {
      return await this.userService.getUser(email);
    }

    @ApiCreatedResponse({type: UserResponseDto})
    @Post()
    async signUpUser(@Body() body: UserSignUpDto) : Promise<UserResponseDto> {
      return await this.userService.signUpUser(body);
    }
}
