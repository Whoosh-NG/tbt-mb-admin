export interface AddNewAdminResponse {
  data: { message: string };
}

export interface AddNewAdminError {
  data: { message: string };
}

export interface AddAdminData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  adminRole: string;
}
export interface updateAdminData {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    // password: string;
    adminRole: string;
  };
  id: string | number;
}
export interface IAdminData {
  id: number;
  userId: number;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  adminRole: string;
}

export interface AdminProps {
  id: string;
  close: () => void;
}
