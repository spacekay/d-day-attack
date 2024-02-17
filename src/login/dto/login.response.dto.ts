import { ApiProperty } from "@nestjs/swagger";

export class LoginResponseDto {
    
    @ApiProperty({
        example: 'test@test.com',
        description: '회원 이메일 주소',
    })
    email: string;

    @ApiProperty({
        example: '테스트',
        description: '회원 이름',
    })
    name: string;

    @ApiProperty({
        example: 'token',
        description: 'JWT 인증 토큰',
    })
    jwt: string;
}