import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Dday, DdaySchema } from 'src/dday/schema/dday.schema';
import { AlarmController } from './alarm.controller';
import { AlarmService } from './alarm.service';
import { Alarm, AlarmSchema } from './schema/alarm.schema';

@Module({
  imports: [
    MongooseModule.forFeature([ {name: Dday.name, schema: DdaySchema},
       {name: Alarm.name, schema: AlarmSchema}])
  ],
  controllers: [AlarmController],
  providers: [AlarmService]
})
export class AlarmModule {}
