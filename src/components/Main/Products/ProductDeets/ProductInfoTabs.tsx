"use client";
import TabTitle from "@/components/ui/Tabs/TabTitle";
import React, { useState } from "react";
import ProductDescriptions from "./ProductDescriptions";
import AdditionalInfo from "./AdditionalInfo";
import Feedbacks from "./Feedbacks";
import TabContents from "@/components/ui/Tabs/TabContents";

const ProductInfoTabs = ({
  desc,
  addtionalInfo,
}: {
  desc: string;
  addtionalInfo: string;
}) => {
  const [activeTab, setActiveTab] = useState("tab1");

  const title = [
    { id: "tab1", title: "Descriptions" },
    { id: "tab2", title: "Additional Information" },
    { id: "tab3", title: "Customer’s Feedback" },
  ];
  const compList = [
    { id: "tab1", comp: <ProductDescriptions desc={desc} /> },
    { id: "tab2", comp: <AdditionalInfo addtionalInfo={addtionalInfo} /> },
    { id: "tab3", comp: <Feedbacks /> },
  ];

  return (
    <section>
      <ul className="container flex flex-wrap justify-normal lg:justify-center">
        {title.map(({ id, title }) => (
          <li key={id} className="w-full text-center lg:w-[20%]">
            <TabTitle
              title={title}
              id={id}
              activeClass="activeProductTab"
              notActiveClass="notActiveProductTab"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </li>
        ))}
      </ul>
      <hr />

      <article className="container mt-8">
        {compList.map(({ id, comp }) => (
          <React.Fragment key={id}>
            <TabContents id={id} activeTab={activeTab} comps={comp} />
          </React.Fragment>
        ))}
      </article>
    </section>
  );
};

export default ProductInfoTabs;
