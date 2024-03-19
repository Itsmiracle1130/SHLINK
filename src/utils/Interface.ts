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
export interface IUrl{
  longUrl: string;
  shortUrl: string;
  clickCount: number;
}
  export interface CustomRequest {
    details: IUser
    file: object
    params: object
    query: object
    path: object
  }


export interface IQRCode{
  qrCode : string
}