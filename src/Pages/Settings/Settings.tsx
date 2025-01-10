import Banners from "@/components/Main/Settings/Banners/Banners";
import RoutingTabTitle from "@/components/ui/Tabs/RoutingTabTitle";
import TabContents from "@/components/ui/Tabs/TabContents";
import useUpdatePageName from "@/Hooks/useUpdatePageName";
import { Link, useSearchParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

export const marketsTabs = {
  TabTitle: [
    {
      id: "tab1",
      title: "Banners",
    },
  ],

  TabContents: [{ id: "tab1", comp: <Banners /> }],
};

const Settings = () => {
  useUpdatePageName("Settings");

  const [query] = useSearchParams();

  const activeTab = query.get("tab") || "tab1";

  return (
    <main className="container py-10">
      <ul className="flex items-center">
        {marketsTabs?.TabTitle.map(({ id, title }) => (
          <Link to={`/settings?tab=${id}`} key={id}>
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

export default Settings;
