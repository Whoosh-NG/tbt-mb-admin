import { IResetPassword, ISignIn } from "@/types/Auth";
import baseAPI from "./axiosInstances";

export const SignIn = async (formData: ISignIn) => {
  return await baseAPI.post("/admin/auth/login", formData);
};

export const requestPasswordChange = async (formData: { email: string }) => {
  return await baseAPI.post(`/admin/auth/send-password-resetotp`, formData);
};

export const resetPassword = async (formData: IResetPassword) => {
  return await baseAPI.post(`/admin/auth/reset-password`, formData);
};

export const uploadFiles = async (formData: any) => {
  return await baseAPI.post(`/files/`, formData);
};
