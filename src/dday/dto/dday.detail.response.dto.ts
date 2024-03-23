import { ApiProperty } from "@nestjs/swagger";
import { AlarmResponseDto } from "src/alarm/dto/alarm.response.dto";
import { DatetimeUtil } from "src/utils/datetime.util";
import { Dday } from "../schema/dday.schema";

export class DdayDetailResponseDto {

    constructor(dday: Dday) {
        this.ddayId = dday.ddayId;
        this.ddayDate = DatetimeUtil.getDateString(dday.ddayDate);
        this.ddayName = dday.ddayName;
        this.isBirthday = dday.isBirthday;
        this.isUserBirthday = dday.isUserBirthday;
        this.birthdayName = dday.birthdayName;
    }

    @ApiProperty({
        example: 'Dday schema id',
        description: 'Dday 아이디',
    })
    ddayId: string;

    @ApiProperty({
        example: '2024-01-01',
        description: '기념일자',
    })
    ddayDate: String;

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

    @ApiProperty({
        example: '믿음이',
        description: '(본인의 생일이 아닌 경우) 생일인 대상 이름',
    })
    birthdayName: string;
    
}