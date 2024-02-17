import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserSignUpDto {

    @ApiProperty({
        example: 'test@test.com',
        description: '이메일 주소',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: 'test',
        description: '비밀번호',
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        example: '테스트',
        description: '이름',
    })
    @IsString()
    @IsNotEmpty()
    name: string;
    
}