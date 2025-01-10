import { AiFillProduct } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdAccountBalance, MdDashboard } from "react-icons/md";
import { RiAdminFill, RiFileList3Fill } from "react-icons/ri";
import { SiMarketo } from "react-icons/si";
import { TbTruckDelivery } from "react-icons/tb";

export const SidebarData = [
  {
    id: "tab1",
    icon: <MdDashboard />,
    title: "Dashboard",
    url: "/",
  },
  {
    id: "tab2",
    icon: <AiFillProduct />,
    title: "Products Management",
    url: "/products-management",
  },
  {
    id: "tab98",
    icon: <SiMarketo />,
    title: "Markets Management",
    url: "/markets-management",
  },
  {
    id: "tab3",
    icon: <FaUsers />,
    title: "Customers Management",
    url: "/customers-management",
  },
  {
    id: "tab4",
    icon: <RiFileList3Fill />,
    title: "Orders Management",
    url: "/orders-management",
  },
  {
    id: "tab5",
    icon: <MdAccountBalance />,
    title: "Accounts Management",
    url: "/accounts-management",
  },
  {
    id: "tab6",
    icon: <TbTruckDelivery />,
    title: "Logistics Management",
    url: "/logistics-management",
  },

  {
    id: "tab7",
    icon: <IoSettingsOutline />,
    title: "Settings",
    url: "/settings",
  },

  {
    id: "tab8",
    icon: <RiAdminFill />,
    title: "Administrators",
    url: "/administrators",
  },
];
