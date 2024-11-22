import { IColData } from "@/types/GlobalInterfaces";
import { readableDateTime } from "./helpers";
import AllCustomers from "@/components/Main/CustomerMgt/AllCustomers";
import Buyers from "@/components/Main/CustomerMgt/Buyers";
import Sellers from "@/components/Main/CustomerMgt/Sellers";
import Markets from "@/components/Main/Markets/Markets";
import Categories from "@/components/Main/Markets/Categories";

export const userColData: IColData[] = [
  {
    name: "Name",
    selector: ({ first_name, last_name }) => `${first_name} ${last_name}`,
    grow: 1.9,
  },
  {
    name: "Email",
    selector: ({ email }) => email,
    grow: 2,
  },
  {
    name: "Phone Number",
    selector: ({ phone_number }) => phone_number,
    grow: 2,
  },

  {
    name: "Joined Date",
    selector: ({ createdAt }) => readableDateTime(createdAt),
    grow: 1.9,
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
  ],

  TabContents: [
    { id: "tab1", comp: <Markets /> },
    { id: "tab2", comp: <Categories /> },
  ],
};
