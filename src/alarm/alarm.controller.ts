import { Body, Controller, Get, Param, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AlarmService } from './alarm.service';
import { AlarmRequestDto } from './dto/alarm.request.dto';
import { AlarmResponseDto } from './dto/alarm.response.dto';

@ApiTags('alarms')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('access-token')
@Controller('alarm')
export class AlarmController {
    constructor(private readonly alarmService: AlarmService) {}

    @ApiResponse({type: AlarmResponseDto})
    @Get()
    async getAlarmList(@Query('ddayId') ddayId: string) : Promise<AlarmResponseDto> {
      return await this.alarmService.getAlarmList(ddayId);
    }

    @ApiResponse({type: AlarmResponseDto})
    @Put(':ddayId')
    async putDday(@Param('ddayId') ddayId: string,
                @Body() body: Array<AlarmRequestDto>) : Promise<AlarmResponseDto> {
      return await this.alarmService.putAlarmList(ddayId, body);
    }


}
