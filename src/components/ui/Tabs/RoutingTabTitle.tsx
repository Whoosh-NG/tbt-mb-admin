import { TabProps } from "@/types/GlobalInterfaces";

const RoutingTabTitle = ({
  id,
  title,
  activeTab,
  activeClass,
  notActiveClass,
  icon,
}: TabProps) => {
  return (
    <div className={activeTab === id ? activeClass : notActiveClass}>
      <div id={id} className={icon ? "flex items-center gap-3" : ""}>
        {icon && <h4 className="!text-base">{icon}</h4>}

        <h4 className="!text-base">{title}</h4>
      </div>
    </div>
  );
};

export default RoutingTabTitle;
