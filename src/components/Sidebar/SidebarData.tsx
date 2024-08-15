import { BiCycling } from 'react-icons/bi';
import { MdDashboard } from 'react-icons/md';
import { RiAdminFill } from 'react-icons/ri';

export const SidebarData = [
  {
    id: 'tab1',
    icon: <MdDashboard />,
    title: 'Dashboard',
    url: '/',
  },
  {
    id: 'tab2',
    icon: <BiCycling />,
    title: 'Riders',
    url: '/riders',
  },
  {
    id: 'tab2',
    icon: <RiAdminFill />,
    title: 'Administrators',
    url: '/administrators',
  },
];
