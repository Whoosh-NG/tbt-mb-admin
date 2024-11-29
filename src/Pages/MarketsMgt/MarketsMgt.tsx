import Agents from "@/components/Main/Markets/Agents/Agents";
import Brands from "@/components/Main/Markets/Brands";
import Categories from "@/components/Main/Markets/Categories";
import Markets from "@/components/Main/Markets/Markets";
import RoutingTabTitle from "@/components/ui/Tabs/RoutingTabTitle";
import TabContents from "@/components/ui/Tabs/TabContents";
import useUpdatePageName from "@/Hooks/useUpdatePageName";
import { Link, useSearchParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

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
    {
      id: "tab4",
      title: "Agents",
    },
  ],

  TabContents: [
    { id: "tab1", comp: <Markets /> },
    { id: "tab2", comp: <Categories /> },
    { id: "tab3", comp: <Brands /> },
    { id: "tab4", comp: <Agents /> },
  ],
};

const MarketsMgt = () => {
  useUpdatePageName("Markets Management");

  const [query] = useSearchParams();

  const activeTab = query.get("tab") || "tab1";

  return (
    <main className="container py-10">
      <ul className="flex items-center">
        {marketsTabs?.TabTitle.map(({ id, title }) => (
          <Link to={`/markets-management?tab=${id}`} key={id}>
            <RoutingTabTitle
              id={id}
              title={title}
              activeClass="active"
              notActiveClass="notActive"
              activeTab={activeTab}
            />
          </Link>
        ))}
      </ul>

      <section>
        {marketsTabs?.TabContents?.map(({ id, comp }) => (
          <Fragment key={id}>
            <TabContents id={id} activeTab={activeTab} comps={comp} />
          </Fragment>
        ))}
      </section>
    </main>
  );
};

export default MarketsMgt;
