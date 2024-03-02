import { ApiProperty } from "@nestjs/swagger";

export class AlarmResponseDto {

    @ApiProperty({
        example: 'Alarm schema object id',
        description: 'Alarm 아이디',
    })
    alarmId: string;

    @ApiProperty({
        example: '2024-01-01 hh:mm:ss',
        description: '알람 적용 시간',
    })
    alarmDateTime: Date;

    @ApiProperty({
        example: true,
        description: '이메일 알람 사용 여부',
    })
    isEmailAlarm: boolean;
    
}