import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop()
  position: string;

  @Prop({ default: new Date() })
  createWhen: Date;

  @Prop({ default: new Date() })
  lastModifiedWhen: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
