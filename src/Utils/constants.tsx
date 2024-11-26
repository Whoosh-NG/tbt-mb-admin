import { IColData } from "@/types/GlobalInterfaces";
import { readableDateTime } from "./helpers";
import AllCustomers from "@/components/Main/CustomerMgt/AllCustomers";
import Buyers from "@/components/Main/CustomerMgt/Buyers";
import Sellers from "@/components/Main/CustomerMgt/Sellers";
import Markets from "@/components/Main/Markets/Markets";
import Categories from "@/components/Main/Markets/Categories";
import Brands from "@/components/Main/Markets/Brands";
import BrandAction from "@/components/Main/Markets/BrandAction";
import AgentAction from "@/components/Main/CustomerMgt/AgentAction";

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
  {
    name: "Action",
    cell: (row) => <AgentAction id={row?.id} />,
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

export const marketsTabs = {
  TabTitle: [
    {
      id: "tab1",
      title: "Markets",
    },

    {
      id: "tab2",
      title: "Categories",
    },

    {
      id: "tab3",
      title: "Brands",
    },
  ],

  TabContents: [
    { id: "tab1", comp: <Markets /> },
    { id: "tab2", comp: <Categories /> },
    { id: "tab3", comp: <Brands /> },
  ],
};
