import Home from '@/Pages/Home/Home';
import Riders from '@/Pages/Riders/Riders';
import { ReactElement } from 'react';

interface Route {
  path: string;
  name: string;
  element: ReactElement;
}

const dashboardRoutes: Route[] = [
  { path: '/', name: 'Dashboard', element: <Home /> },
  { path: '/riders', name: 'Riders', element: <Riders /> },
];

export default dashboardRoutes;
