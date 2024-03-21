export interface IUser {
  _id?: string
  email: string
  password: string
  username?: string
  createdAt?: Date
  updatedAt?: Date
}
export interface ILogin{
    email: string
    password: string
}
export interface IUrl {
  _id?: string;
  username: string;
  shortCode: string;
  longUrl: string;
  shortUrl: string;
  QRCode: string;
  clicks: {
      timestamp: Date;
      ipAddress: string;
      userAgent: string;
  }[];
  clickCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}
  export interface CustomRequest {
    user: IUser
    file: object
    params: object
    query: object
    path: object
  }

export interface IQRCode{
  qrCode : string
}

export interface PayloadInterface {
  id: string
  email: string
}

export interface CustomUrlInterface {
  shortCode: string,
  longUrl: string
}