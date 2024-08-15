import { ReactNode } from 'react';

export interface TabProps {
  id: string;
  title: string;
  icon?: ReactNode;
  imageUrl?: string;
  activeClass: string;
  notActiveClass: string;
  activeTab?: string;
  setActiveTab?: (id: string) => void;
}

export interface TabContentsProps {
  id: string;
  activeTab?: string;
  comps?: ReactNode;
}

export interface IStepForm {
  onNext: () => void;
  onPrevious?: () => void;
}

export interface IStoreSetup {
  type?: string;
  label?: string;
  id: string;
  name: string;
  require?: boolean;
  placeholder?: string;
  options?: {
    id?: string;
    title?: string;
    value?: string;
  }[];
  // options?: {
  //   id?: string;
  //   title?: string;
  //   value?: string;
  //   name?: string;
  //   province?: string;
  // }[];
  canadianCities?: { name: string; province: string }[];
  canadianProvince?: { name: string; province: string }[];
}

export interface IModal {
  id: string;
  close: () => void;
}

export interface IServerResponse {
  data: { message: string };
}

export interface IServerError {
  data: { message: string };
}
