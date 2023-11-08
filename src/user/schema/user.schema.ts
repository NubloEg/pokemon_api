import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {

  _id: string;

  @Prop({required:true,unique:true})
  email: string;

  @Prop({required:true})
  password: string;
  
  @Prop({a:true})
  createDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);