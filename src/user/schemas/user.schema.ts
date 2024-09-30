import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class Address {
  @Prop()
  street: string;

  @Prop()
  city: string;

  @Prop()
  zipCode: string;

  @Prop()
  country: string;
}

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  pseudonym: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  name: string;

  @Prop({ type: Address })
  address: Address;

  @Prop()
  comment: string;

  @Prop({ required: true, enum: ['admin', 'user'] })
  userType: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  const user = this as UserDocument;
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});
