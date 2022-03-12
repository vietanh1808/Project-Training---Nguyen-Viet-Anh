export interface AuthToken {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface IUser {
  countOfLoginAttempts: number
  dateOfLoginAttempt: number
  firstName: string
  forceChangePassword: number
  lastName: string
  login: string
  profile_id: number
  user_cookie: string
}
