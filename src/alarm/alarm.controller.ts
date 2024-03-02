import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('alarms')
@Controller('alarm')
export class AlarmController {}
