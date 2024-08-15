import { updatePageName } from '@/Redux/Features/globalSlice';
import { useAppDispatch } from '@/Redux/reduxHooks';
import { useEffect } from 'react';

const useUpdatePageName = (pageName: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pageName) {
      dispatch(updatePageName(pageName));
    }
  }, [dispatch, pageName]);
};

export default useUpdatePageName;
