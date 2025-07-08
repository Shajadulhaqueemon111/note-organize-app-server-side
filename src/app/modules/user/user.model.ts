/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { IUser } from './user.interface';
import config from '../../config';
import bycript from 'bcryptjs';
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  //   console.log(this, 'pre hook : we will save data');
  const user = this;
  user.password = await bycript.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
userSchema.post('save', function (doc, next) {
  //   console.log(this, 'post hook : we will save data');
  doc.password = '';
  next();
});
const UserModel = model<IUser>('User', userSchema);

export default UserModel;
