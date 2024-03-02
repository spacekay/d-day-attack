import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserSignUpDto } from './dto/user.signup.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { UserService } from './user.service';
import { UserPutRequestDto } from './dto/user.put.request.dto';

@ApiTags('users')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiResponse({type: UserResponseDto})
    @Get(':userEmail')
    async getUser(@Param('userEmail') email: string) : Promise<UserResponseDto> {
      return await this.userService.getUser(email);
    }

    @ApiCreatedResponse({type: UserResponseDto})
    @Post()
    async signUpUser(@Body() body: UserSignUpDto) : Promise<UserResponseDto> {
      return await this.userService.signUpUser(body);
    }

    @ApiResponse({type: UserResponseDto})
    @Put()
    async putUser(@Body() body: UserPutRequestDto) : Promise<UserResponseDto> {
      return await this.userService.putUser(body);
    }
}
