import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserPutRequestDto } from './dto/user.put.request.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { UserSignUpDto } from './dto/user.signup.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiResponse({type: UserResponseDto})
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @Get()
    async getUser(@Query('userEmail') email: string) : Promise<UserResponseDto> {
      return await this.userService.getUser(email);
    }

    @ApiCreatedResponse({type: UserResponseDto})
    @Post()
    async signUpUser(@Body() body: UserSignUpDto) : Promise<UserResponseDto> {
      return await this.userService.signUpUser(body);
    }

    @ApiResponse({type: UserResponseDto})
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @Put()
    async putUser(@Body() body: UserPutRequestDto) : Promise<UserResponseDto> {
      return await this.userService.putUser(body);
    }
}
