export interface ISignIn {
  email: string;
  password: string;
}

export interface IUpdateUser {
  username?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}

export interface IResetPassword {
  otp: string;
  password: string;
  password_confirmation: string;
}
export interface IVerifyLogins {
  userId: string;
  uniqueVerificationCode: string;
}
export interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
}
