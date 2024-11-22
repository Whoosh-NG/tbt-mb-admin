import { TabProps } from "@/types/GlobalInterfaces";

const TabTitle = ({
  id,
  title,
  activeTab,
  setActiveTab,
  activeClass,
  notActiveClass,
  icon,
}: TabProps) => {
  const handTabSwitch = (id: string) => {
    if (setActiveTab) {
      setActiveTab(id);
    }
  };

  return (
    <div
      key={id}
      onClick={() => handTabSwitch(id)}
      className={activeTab === id ? activeClass : notActiveClass}
    >
      <hgroup id={id} className={icon ? "flex items-center gap-3" : ""}>
        {icon && <h4 className="">{icon}</h4>}
        <h4>{title}</h4>
      </hgroup>
    </div>
  );
};

export default TabTitle;
