import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty } from "class-validator";

export class AlarmRequestDto {

    @ApiProperty({
        example: '2024-01-01 hh:mm:ss',
        description: '알람 적용 시간',
    })
    @IsDateString()
    @IsNotEmpty()
    alarmDateTime: Date;
    
}