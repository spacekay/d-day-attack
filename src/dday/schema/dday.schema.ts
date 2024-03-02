import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import mongoose, { Document, Types } from 'mongoose';
import { Alarm } from 'src/alarm/schema/alarm.schema';
import { User } from 'src/user/schema/user.schema';

export type DdayDocument = Dday & Document;

export @Schema({ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } })
class Dday{

  @Prop({
    required: true,
    unique: true
  })
  id: Types.ObjectId;
  
  @Prop({
    required: true
  })
  user: User;

  @Prop({ default: new Date(),
     type: mongoose.Schema.Types.Date,
     required: true
   })
  ddayDate: Date;

  @Prop({
    required: true
  })
  @IsNotEmpty()
  ddayName: string;

  @Prop({
    default: false
  })
  isBirthday: boolean;

  @Prop({
    default: false
  })
  isUserBirthday: boolean;
  
  birthdayName: string;

  @Prop({
    default: true
  })
  isActive: boolean;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  updatedAt: Date;

  alarms: Alarm[];
 
}

export const DdaySchema = SchemaFactory.createForClass(Dday);
