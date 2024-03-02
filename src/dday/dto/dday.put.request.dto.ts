import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class DdayPutRequestDto {

    @ApiProperty({
        example: 'Dday schema object id',
        description: 'Dday 아이디',
    })
    @IsString()
    @IsNotEmpty()
    ddayId: string;

    @ApiProperty({
        example: '2024-01-01',
        description: '기념일자',
    })
    @IsDateString()
    @IsNotEmpty()
    ddayDate: Date;

    @ApiProperty({
        example: '첫째 동생 생일',
        description: '기념일 이름',
    })
    @IsString()
    @IsNotEmpty()
    ddayName: string;

    @ApiProperty({
        example: true,
        description: '생일 여부',
    })
    @IsNotEmpty()
    isBirthday: boolean;

    @ApiProperty({
        example: false,
        description: '사용자 본인 생일 여부',
    })
    @IsNotEmpty()
    isUserBirthday: boolean;

    @ApiProperty({
        example: '믿음이',
        description: '(본인의 생일이 아닌 경우) 생일인 대상 이름',
    })
    @IsString()
    birthdayName: string;
    
}