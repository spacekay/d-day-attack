import { ApiProperty } from "@nestjs/swagger";
import { DdaySimpleResponseDto } from "src/dday/dto/dday.simple.response.dto";
import { User } from "../schema/user.schema";

export class UserResponseDto {

    constructor(user: User) {
        this.email = user.userMail;
        this.name = user.userName;
        this.isUsingEmailAlarm = user.isUsingEmailAlarm;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
        this.ddays = user.ddays != null ? user.ddays.map(dday => new DdaySimpleResponseDto(dday)) : [];
    }

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

    @ApiProperty({
        description: '기념일 목록',
    })
    ddays: DdaySimpleResponseDto[]; 
    
}