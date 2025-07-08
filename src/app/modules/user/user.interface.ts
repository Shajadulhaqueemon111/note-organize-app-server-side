import { USER_ROLE } from './user.constant';

export type IUser = {
  name: string;
  email: string;
  profileImage: string;
  password: string;
  role: 'user' | 'admin';
};

export type TUserRole = keyof typeof USER_ROLE;
