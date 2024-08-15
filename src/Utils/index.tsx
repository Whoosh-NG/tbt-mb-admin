// import { useSweetAlert } from '@/Hooks/useSweetAlert';
import DynamicProductList from '@/components/DashboardComps/StoresComps/ProductListingComps/DynamicProductList';
import dayjs from 'dayjs';
import numeral from 'numeral';
import toast from 'react-hot-toast';
// const { showAlert } = useSweetAlert();
import relativeTime from 'dayjs/plugin/relativeTime';
import DynamicFaqAccordion from '@/components/DashboardComps/CategoriesComps/HelpCategoriesDetails/DynamicFaqAccordion';

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
    ? dayjs(now).format('MMMM D, YYYY')
    : dayjs(now).format('MMMM D, YYYY h:mm A');
};

export const readableDateTimeV2 = (now: Date) => {
  return dayjs(now).format('YY-MM-D h:mm A');
};

export const formatTimeString = (timeString: string) => {
  // Parse the time string using dayjs
  const time = dayjs(`1970-01-01T${timeString}`);

  // Format the time string as "hh:mm:ss A"
  return time.format('hh:mm:ss A');
};

// Render product list comps dynamically
export const TabContentsComps = (titleList: any, id: number) => {
  const comps = [];
  for (let i = 0; i < titleList?.length; i++) {
    comps.push({
      id: `tab${titleList[i].id}`,
      comp: (
        <DynamicProductList
          catSubName={titleList[i].subCategory?.subName}
          sellerId={id}
        />
      ),
    });
  }

  return comps;
};

// Render support and help list comps dynamically
export const SupportTabContentsComps = (titleList: any) => {
  const comps = [];
  for (let i = 0; i < titleList?.length; i++) {
    comps.push({
      id: `tab${titleList[i]?.id}`,
      comp: (
        <DynamicFaqAccordion
          id={titleList[i]?.id}
          catName={titleList[i]?.category}
        />
      ),
    });
  }

  return comps;
};

export const formatNumInThousands = (value: number) => {
  // Format using numeral.js
  return numeral(value).format('0.00a');
};

export const calculateAdsProgress = (startDate: Date, endDate: Date) => {
  // Convert dates to milliseconds
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  // Get current time
  const now = new Date().getTime();

  // Calculate the total duration and the elapsed time
  const totalDurationMs = end - start;
  const elapsedMs = now - start;

  // Ensure that the elapsed time does not exceed the total duration
  const validElapsedMs = Math.min(elapsedMs, totalDurationMs);

  // Calculate the percentage of elapsed time
  const progressPercentage = (validElapsedMs / totalDurationMs) * 100;

  // Ensure that the progress is between 0 and 100%
  return Math.max(0, Math.min(progressPercentage, 100));
};

export const getStatusMessage = (approvalStatus: string, status: string) => {
  if (approvalStatus === 'pending' || status === 'pending') {
    return 'Ads Pending Approval';
  }

  if (
    approvalStatus === 'declined' &&
    (status === 'pending' || status === 'paid' || status === 'active')
  ) {
    return 'Ads declined by admin';
  }
  if (approvalStatus === 'approved' && status === 'paid') {
    return 'Ads Scheduled';
  }
  if (approvalStatus === 'approved' && status === 'deactivated') {
    return 'Ads Completed';
  }
  if (approvalStatus === 'approved' && status === 'active') {
    return 'In progress';
  }
};
