import { IColData } from "@/types/GlobalInterfaces";
import { formatNumInThousands, readableDateTime } from "./helpers";
import AllCustomers from "@/components/Main/CustomerMgt/AllCustomers";
import Buyers from "@/components/Main/CustomerMgt/Buyers";
import Sellers from "@/components/Main/CustomerMgt/Sellers";
import BrandAction from "@/components/Main/Markets/BrandAction";
import AgentAction from "@/components/Main/Markets/Agents/AgentAction";
import Button from "@/components/ui/Button";
import LogisticsAction from "@/components/Main/Logistics/LogisticsAction";
import CouponAction from "@/components/Main/Settings/Coupons/CouponAction";
import ServiceAction from "@/components/Main/Settings/ServiceCharge/ServiceAction";

// export const baseUrl= "https://api.tbt.live.whooshing.xyz/api/v1"
export const baseUrl = "https://tbt-agro.whooshing.xyz/api/v1";

export const tableCustomStyles = {
  headCells: {
    style: {
      color: "var(--pryColor)",
      fontWeight: 600,
      backgroundColor: "#F6F6F7",
    },
  },
};

export const userColData: IColData[] = [
  {
    name: "Name",
    selector: ({ first_name, last_name }) => `${first_name} ${last_name}`,
  },
  {
    name: "Email",
    selector: ({ email }) => email,
  },
  {
    name: "Phone Number",
    selector: ({ phone_number }) => phone_number,
  },

  {
    name: "Joined Date",
    selector: ({ created_at }) => readableDateTime(created_at),
    grow: 1.3,
  },
  {
    name: "User Type",
    width: "100px",
    selector: ({ user_type }) => user_type,
  },

  //   {
  //     name: "Action",
  //     width: "100px",
  //     cell: (row) => (
  //       <>
  //         <button onClick={() => handleButtonClick(row.id)}>{btnTitle}</button>

  //         <Modal
  //           id={row.id}
  //           className="absolute right-[5rem] top-0 z-50 w-full bg-white"
  //         >
  //           <SLAsAction status={row.isEnabled} id={row.id} name={row.name} />
  //         </Modal>
  //       </>
  //     ),
  //   },
];

export const brandColData = (): IColData[] => {
  return [
    {
      name: "App Type",
      selector: ({ app_type }) => app_type,
    },
    {
      name: "Name",
      selector: ({ name }) => name,
    },

    {
      name: "Description",
      selector: ({ description }) => description,
      grow: 3,
    },
    {
      name: "Products Counts",
      selector: ({ products_count }) => products_count,
    },
    {
      name: "Action",
      cell: (row) => <BrandAction id={row?.id} />,
    },
  ];
};

export const orderColData = (): IColData[] => {
  return [
    {
      name: "Order ID",
      selector: ({ id }) => id,
      width: "100px",
    },
    {
      name: "Order ref.",
      selector: ({ order_reference }) => order_reference,
    },
    {
      name: "Payment Method",
      selector: ({ payment_method }) => payment_method,
    },
    {
      name: "Amount",
      selector: ({ total }) => `₦${formatNumInThousands(total)}`,
    },
    {
      name: "Username",
      selector: ({ user }) => `${user?.first_name} ${user?.last_name}`,
      grow: 2,
    },

    {
      name: "Date",
      selector: ({ created_at }) => readableDateTime(created_at),
      grow: 2,
    },
    {
      name: "Status",
      selector: ({ payment_status }) => payment_status,
      width: "100px",
    },
    {
      name: "Action",
      width: "100px",
      cell: ({ id }) => (
        <Button link href={`/view-order/${id}`}>
          View
        </Button>
      ),
    },
  ];
};

export const paymentColData = (): IColData[] => {
  return [
    {
      name: "Order ref.",
      selector: ({ reference }) => reference,
    },
    {
      name: "Channel",
      selector: ({ channel }) => channel,
      width: "100px",
    },
    {
      name: "Amount",
      selector: ({ amount }) => `₦${formatNumInThousands(amount)}`,
    },
    {
      name: "Order ID",
      selector: ({ order_id }) => order_id,
      width: "100px",
    },
    {
      name: "Username",
      selector: ({ user }) => `${user?.first_name} ${user?.last_name}`,
    },

    {
      name: "Date",
      selector: ({ created_at }) => readableDateTime(created_at),
      grow: 2,
    },
    {
      name: "Status",
      selector: ({ status }) => status,
    },
  ];
};

export const USerTabs = {
  TabTitle: [
    {
      id: "tab1",
      title: "All Users",
    },

    {
      id: "tab2",
      title: "Buyers",
    },

    {
      id: "tab3",
      title: "Sellers",
    },
  ],

  TabContents: [
    { id: "tab1", comp: <AllCustomers /> },
    { id: "tab2", comp: <Buyers /> },
    { id: "tab3", comp: <Sellers /> },
  ],
};

export const agentColData = (market?: boolean): IColData[] => {
  return [
    {
      name: "Name",
      selector: ({ first_name, last_name }) => `${first_name} ${last_name}`,
    },
    {
      name: "Email",
      selector: ({ email }) => email,
    },
    {
      name: "Phone Number",
      selector: ({ phone_number }) => phone_number,
    },

    {
      name: "Joined Date",
      selector: ({ created_at }) => readableDateTime(created_at),
      grow: 1.3,
    },
    {
      name: "User Type",
      width: "100px",
      selector: ({ user_type }) => user_type,
    },

    {
      name: "Action",
      cell: (row) => <AgentAction market={market} id={row?.id} />,
    },
  ];
};

export const logisticsColData = (): IColData[] => {
  return [
    {
      name: "ID",
      selector: ({ id }) => id,
      width: "100px",
    },
    {
      name: "From",
      selector: ({ from }) => from,
    },
    {
      name: "To",
      selector: ({ to }) => to,
    },
    {
      name: "Base Fare",
      selector: ({ base_fare }) => `₦${formatNumInThousands(base_fare)}`,
    },
    {
      name: "Minimum Fare",
      selector: ({ minimum_fare }) => `₦${formatNumInThousands(minimum_fare)}`,
    },

    {
      name: "Price Per KM",
      selector: ({ per_km }) => `₦${formatNumInThousands(per_km)}`,
    },
    {
      name: "Date Crerated",
      selector: ({ created_at }) => readableDateTime(created_at, true),
      grow: 1.5,
    },

    {
      name: "Action",
      cell: (row) => <LogisticsAction id={row?.id} />,
      grow: 1.5,
    },
  ];
};

export const couponColData = (): IColData[] => {
  return [
    {
      name: "Code",
      selector: ({ code }) => code,
      width: "100px",
    },
    {
      name: "Name",
      selector: ({ name }) => name,
    },

    {
      name: "Value",
      selector: ({ value }) => `${value}%`,
    },
    {
      name: "Date Crerated",
      selector: ({ created_at }) => readableDateTime(created_at, true),
      grow: 1.5,
    },
    {
      name: "Status",
      grow: 1.5,

      cell: ({ status }) => (
        <p
          className={`capitalize ${
            status === "active" ? "!text-positive" : "text-negative"
          }`}
        >
          {status}
        </p>
      ),
    },
    {
      name: "Action",
      cell: (row) => <CouponAction data={row} />,
      grow: 1.5,
    },
  ];
};

export const serviceColData = (): IColData[] => {
  return [
    {
      name: "ID",
      selector: ({ id }) => id,
      width: "100px",
    },
    {
      name: "Label",
      selector: ({ description }) => description,
    },

    {
      name: "Value",
      selector: ({ value }) => `${value}%`,
    },
    // {
    //   name: "Date Crerated",
    //   selector: ({ created_at }) => readableDateTime(created_at, true),
    //   grow: 1.5,
    // },
    {
      name: "Status",
      grow: 1.5,

      cell: ({ status }) => (
        <p
          className={`capitalize ${
            status === "active" ? "!text-positive" : "text-negative"
          }`}
        >
          {status}
        </p>
      ),
    },
    {
      name: "Action",
      cell: (row) => <ServiceAction data={row} />,
      grow: 1.5,
    },
  ];
};
