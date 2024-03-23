import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

export type DdayDocument = Dday & Document;

export @Schema({ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }})
class Dday{
  
  @Prop({
    required: true
  })
  @IsNotEmpty()
  ddayId: string;
  
  @Prop({
    required: true,
    ref: 'User'
  })
  user: User;

  @Prop({ default: new Date(),
     type: mongoose.Schema.Types.Date,
     required: true
   })
   @IsNotEmpty()
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
  
  @Prop()
  birthdayName: string;

  @Prop({
    default: true
  })
  isActive: boolean;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  updatedAt: Date;
 
}

export const DdaySchema = SchemaFactory.createForClass(Dday);
