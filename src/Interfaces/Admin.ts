export interface AddNewAdminResponse {
  data: { message: string };
}

export interface AddNewAdminError {
  data: { message: string };
}

export interface AddAdminData {
  full_name: string;
  email: string;
  password: string;
  adminRole: string;
}
export interface updateAdminData {
  formData: {
    full_name: string;
    email: string;
    // password: string;
    adminRole: string;
  };
  id: string | number;
}
export interface IAdminData {
  id: number;
  userId: number;
  full_name: string;
  email: string;
  phone_number: string;
  adminRole: string;
}

export interface AdminProps {
  id: string;
  close: () => void;
}
