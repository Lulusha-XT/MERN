export interface IUser {
  username: string;
  email: string;
  password: string;
  role?: string; //admin, user
  created_at?: Date;
  updated_at?: Date;
}

export interface IUserDocument extends IUser {
  userId: string;
  token: string;
}
