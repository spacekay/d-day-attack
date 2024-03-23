import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { Dday } from 'src/dday/schema/dday.schema';

export type AlarmDocument = Alarm & Document;

export @Schema({ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } })
class Alarm{

  @Prop({
    required: true
  })
  @IsNotEmpty()
  ddayId: string;

  @Prop({ default: new Date(),
    type: mongoose.Schema.Types.Date,
    required: true
  })
  @IsNotEmpty()
  alarmDateTime: Date;

  @Prop({
    default: true
  })
  isEmailAlarm: boolean;

  @Prop()
  alarmEmail: string;

  @Prop()
  emailErrorDetail: string;

  @Prop({
    default: false
  })
  isUsed: boolean;

  @Prop({
    default: true
  })
  isActive: boolean;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  updatedAt: Date;
 
}

export const AlarmSchema = SchemaFactory.createForClass(Alarm);