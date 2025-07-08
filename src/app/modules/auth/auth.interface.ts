export type TLogin = {
  name: string;
  email: string;
  profileImage: string;
  password: string;
  status?: 'active' | 'blocked';
};
