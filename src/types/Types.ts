export interface IUser {
  username: string;
  email: string;
  ID: string;
  date_of_birth: string;
  avatar: string;
  role: string;
}
export interface IUserLogin extends IUser {
  token: string;
}
export interface IUserRegister {
  username: string;
  email: string;
  password: string;
  password2: string;
  dateOfBirth: string;
  avatar?: File | undefined;
}

export interface IImage {
  ID: string;
  data: string;
  user_id: string;
  username: string;
  name: string;
  description: string;
  date_added: string;
  AVGRating: number;
  ratings: IRating[];
}

export interface IMessage {
  ID: string;
  content: string;
  theme: string;
  date: string;
  sender: string;
  recipent: string;
  sender_readed?: boolean;
  recipent_readed?: boolean;
  sender_deleted?: boolean;
  recipent_deleted?: boolean;
  senderUsername?: string;
  recipentUsername?: string;
}
export interface IMessageToSend {
  content: string;
  theme: string;
  date: string;
  sender: string;
  recipent: string;
}

export interface IRating {
  userId: string;
  imageId: string;
  value: number;
}
