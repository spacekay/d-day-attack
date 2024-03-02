import { ApiProperty } from "@nestjs/swagger";
import { Dday } from "../schema/dday.schema";

export class DdaySimpleResponseDto {

    constructor(dday: Dday) {
        this.ddayId = dday.id.toString('hex');
        this.ddayDate = dday.ddayDate;
        this.ddayName = dday.ddayName;
        this.isBirthday = dday.isBirthday;
        this.isUserBirthday = dday.isUserBirthday;
    }

    @ApiProperty({
        example: 'Dday schema object id',
        description: 'Dday 아이디',
    })
    ddayId: string;

    @ApiProperty({
        example: '2024-01-01',
        description: '기념일자',
    })
    ddayDate: Date;

    @ApiProperty({
        example: '첫째 동생 생일',
        description: '기념일 이름',
    })
    ddayName: string;

    @ApiProperty({
        example: true,
        description: '생일 여부',
    })
    isBirthday: boolean;

    @ApiProperty({
        example: false,
        description: '사용자 본인 생일 여부',
    })
    isUserBirthday: boolean;
    
}