import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {

    @ApiProperty({
        example: 'test@test.com',
        description: '이메일 주소',
    })
    email: string;

    @ApiProperty({
        example: '테스트',
        description: '이름',
    })
    name: string;

    @ApiProperty({
        example: true,
        description: '이메일 알람 사용 여부',
    })
    isUsingEmailAlarm: boolean;

    @ApiProperty({
        description: '회원 가입 일시',
    })
    createdAt: Date;

    @ApiProperty({
        description: '회원 정보 변경 일시',
    })
    updatedAt: Date;
    
}