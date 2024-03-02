import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DdayController } from './dday.controller';
import { DdayService } from './dday.service';
import { Dday, DdaySchema } from './schema/dday.schema';

@Module({
  imports: [
    MongooseModule.forFeature([ {name: Dday.name, schema: DdaySchema}])
  ],
  controllers: [DdayController],
  providers: [DdayService]
})
export class DdayModule {}
