import { ApiProperty } from "@nestjs/swagger";
import { Alarm } from "../schema/alarm.schema";
import { DatetimeUtil } from "src/utils/datetime.util";

export class AlarmResponseDto {

    constructor(alarm: Alarm) {
        this.alarmDateTime = DatetimeUtil.getDateTimeString(alarm.alarmDateTime);
        this.isEmailAlarm = alarm.isEmailAlarm;
    }

    @ApiProperty({
        example: '2024-01-01 hh:mm:ss',
        description: '알람 적용 시간',
    })
    alarmDateTime: String;

    @ApiProperty({
        example: true,
        description: '이메일 알람 사용 여부',
    })
    isEmailAlarm: boolean;
    
}