import ChangePassword from '@/Pages/Auth/ChangePassword';
import ForgotPasswordRequest from '@/Pages/Auth/ForgotPasswordRequest';
import Signin from '@/Pages/Auth/Signin/Signin';
import { ReactElement } from 'react';

interface Route {
  path: string;
  element: ReactElement;
}

const generalRoutes: Route[] = [
  { path: '/signin', element: <Signin /> },
  { path: '/forgot-password', element: <ForgotPasswordRequest /> },
  { path: '/reset-password', element: <ChangePassword /> },
];

export default generalRoutes;
