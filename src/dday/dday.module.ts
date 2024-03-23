import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { DdayController } from './dday.controller';
import { DdayService } from './dday.service';
import { Dday, DdaySchema } from './schema/dday.schema';
@Module({
  imports: [
    MongooseModule.forFeature(
      [ {name: Dday.name, schema: DdaySchema},
        {name: User.name, schema: UserSchema}])
  ],
  controllers: [DdayController],
  providers: [DdayService]
})
export class DdayModule {}
