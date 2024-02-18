export interface IUsers {
  id: number;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUploads {
  id: number;
  filename: string;
  label: string;
  uploadBy: string;
}

export interface IShareDocuments {
  filename: string;
  label: string;
  reciveEmail: string;
  senderEmail: string;
}

export interface IChats {
  message: string;
  senderName: string;
  createdAt: string;
  senderEmail: string;
  isMine?: boolean
}
