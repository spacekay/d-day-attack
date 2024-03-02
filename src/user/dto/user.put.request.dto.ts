import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserPutRequestDto {

    @ApiProperty({
        example: 'test@test.com',
        description: '이메일 주소',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: '테스트',
        description: '사용자 이름',
    })
    @IsString()
    @IsNotEmpty()
    name: string;
    
}