import dayjs from "dayjs";
import numeral from "numeral";
import toast from "react-hot-toast";
import relativeTime from "dayjs/plugin/relativeTime";
import { QueryActionCreatorResult } from "@reduxjs/toolkit/query";
import { Dispatch, SetStateAction } from "react";

dayjs.extend(relativeTime);

export const handleCopyToClipboard = (
  id: string | number,
  val: string,
  message?: string,
) => {
  if (id) {
    navigator.clipboard.writeText(val);
    toast.success(message as string);
  }
};

export const formatDateToAgo = (lastActivity: string) => {
  return dayjs(lastActivity).fromNow();
};
export const readableDateTime = (now: Date, noTime?: boolean) => {
  return noTime
    ? dayjs(now).format("MMMM D, YYYY")
    : dayjs(now).format("MMMM D, YYYY h:mm A");
};

export const readableDateTimeV2 = (now: Date) => {
  return dayjs(now).format("YY-MM-D h:mm A");
};

export const formatTimeString = (timeString: string) => {
  // Parse the time string using dayjs
  const time = dayjs(`1970-01-01T${timeString}`);

  // Format the time string as "hh:mm:ss A"
  return time.format("hh:mm:ss A");
};

export const formatNumInThousands = (value: number | string) => {
  // Format using numeral.js
  return numeral(value).format("0.00a");
};

export const queryBuilder = (params: { [key: string]: string }) => {
  return new URLSearchParams(params);
};

export const reftechData = async (
  data: () => QueryActionCreatorResult<any>,
  id: string,
  setLoading: Dispatch<SetStateAction<{ [key: string | number]: boolean }>>,
) => {
  setLoading({ [id]: true });
  try {
    await data();
  } catch (error) {
    console.log(error);
  } finally {
    setLoading({ [id]: false });
  }
};

export const apiKey = import.meta.env.VITE_GOOGLE_MAP;
