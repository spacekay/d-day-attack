import { ApiProperty } from "@nestjs/swagger";

export class LoginRequestDto {
    @ApiProperty({
        example: 'test@test.com',
        description: '이메일 주소',
    })
    email: string;

    @ApiProperty({
        example: 'test',
        description: '비밀번호',
    })
    password: string;
}