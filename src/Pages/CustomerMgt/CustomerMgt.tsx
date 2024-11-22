import { useGetAllUsersQuery } from "@/api/apiSlice";
import RoutingTabTitle from "@/components/ui/Tabs/RoutingTabTitle";
import TabContents from "@/components/ui/Tabs/TabContents";
import { USerTabs } from "@/Utils/constants";
import { Link, useSearchParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const CustomerMgt = () => {
  const [query] = useSearchParams();

  const activeTab = query.get("tab") || "tab1";

  return (
    <main className="container py-10">
      <h2>All users</h2>

      <ul className="flex items-center">
        {USerTabs?.TabTitle.map(({ id, title }) => (
          <Link to={`/customers-management?tab=${id}`} key={id}>
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
        {USerTabs?.TabContents?.map(({ id, comp }) => (
          <Fragment key={id}>
            <TabContents id={id} activeTab={activeTab} comps={comp} />
          </Fragment>
        ))}
      </section>
    </main>
  );
};

export default CustomerMgt;
