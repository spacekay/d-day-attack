import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

export @Schema({ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } })
class User{

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  updatedAt: Date;

  @Prop() 
  userName: string; 

  @Prop()
  password: string;

  @Prop()
  price: number;
 
}

export const UserSchema = SchemaFactory.createForClass(User);