import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

export @Schema({ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } })
class User{

  @Prop({
    required: true
  }) 
  @IsEmail()
  @IsNotEmpty()
  userMail: string; 

  @Prop({
    required: true
  }) 
  @IsNotEmpty()
  userName: string; 

  @Prop({
    required: true
  })
  @IsNotEmpty()
  password: string;

  @Prop({
    default: true
  })
  isUsingEmailAlarm: boolean;

  @Prop({
    default: 0
  })
  maxDailyEmailUsage: number;

  @Prop({
    default: true
  })
  isActive: boolean;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  updatedAt: Date;
 
}

export const UserSchema = SchemaFactory.createForClass(User);