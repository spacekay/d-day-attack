import { ApiProperty } from "@nestjs/swagger";
import { AlarmResponseDto } from "src/alarm/dto/alarm.response.dto";
import { Dday } from "../schema/dday.schema";

export class DdayDetailResponseDto {

    constructor(dday: Dday) {
        this.ddayId = dday.id.toString('hex');
        this.ddayDate = dday.ddayDate;
        this.ddayName = dday.ddayName;
        this.isBirthday = dday.isBirthday;
        this.isUserBirthday = dday.isUserBirthday;
        this.birthdayName = dday.birthdayName;
        this.alarms = dday.alarms != null ? dday.alarms.map(alarm => new AlarmResponseDto(alarm)) : [];
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

    @ApiProperty({
        example: '믿음이',
        description: '(본인의 생일이 아닌 경우) 생일인 대상 이름',
    })
    birthdayName: string;
    
    @ApiProperty({
        description: '알람 예약 목록',
    })
    alarms: AlarmResponseDto[];
    
}