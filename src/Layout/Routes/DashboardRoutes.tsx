import AccountMgt from "@/Pages/AccountMgt/AccountMgt";
import Administrators from "@/Pages/Administrators/Administrators";
import CustomerMgt from "@/Pages/CustomerMgt/CustomerMgt";
import Home from "@/Pages/Home/Home";
import LogisticsMgt from "@/Pages/LogisticsMgt/LogisticsMgt";
import OrderMgt from "@/Pages/OrderMgt/OrderMgt";
import ProductMgt from "@/Pages/ProductMgt/ProductMgt";
import { ReactElement } from "react";

interface Route {
  path: string;
  name: string;
  element: ReactElement;
}

const dashboardRoutes: Route[] = [
  { path: "/", name: "Dashboard", element: <Home /> },
  {
    path: "/products-management",
    name: "Products Management",
    element: <ProductMgt />,
  },
  {
    path: "/customers-management",
    name: "Customers Management",
    element: <CustomerMgt />,
  },
  {
    path: "/accounts-management",
    name: "Accounts Management",
    element: <AccountMgt />,
  },
  {
    path: "/logistics-management",
    name: "Logistics Management",
    element: <LogisticsMgt />,
  },
  {
    path: "/orders-management",
    name: "Order Management",
    element: <OrderMgt />,
  },

  {
    path: "/administrators",
    name: "Administrators",
    element: <Administrators />,
  },
];

export default dashboardRoutes;
