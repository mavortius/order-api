import { Document, model, Model, Schema } from 'mongoose'
import * as uniqueValidator from 'mongoose-unique-validator'

export interface User extends Document {
  username: String
  firstName: String
  lastName: String
  email: String
  password: String
  phone: String
  userStatus: Number
}

export const UserSchema: Schema = new Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  userStatus: Number,
})

UserSchema.plugin(uniqueValidator)

export const UserModel: Model<User> = model<User>('User', UserSchema)
