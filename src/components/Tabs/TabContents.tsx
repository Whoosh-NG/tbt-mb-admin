import { TabContentsProps } from '@/Interfaces/GlobalInterfaces';
import React from 'react';

const TabContents: React.FC<TabContentsProps> = ({ id, activeTab, comps }) => {
  return activeTab === id ? <div className=''> {comps} </div> : '';
};

export default TabContents;
