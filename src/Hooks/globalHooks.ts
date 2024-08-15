import { Dispatch, SetStateAction, useState } from 'react';
import * as API from '../api/apis';
import { useDispatch } from 'react-redux';
import { toggleShow } from '../Redux/Features/globalSlice';

export const useGlobalHooks = () => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<{ [key: string | number]: boolean }>(
    {},
  );
  const [errors, setErrors] = useState({ error: false, errMessage: '' });

  const dispatch = useDispatch();

  const handleShow = (id: any) => {
    dispatch(toggleShow(id));
  };

  const handleError = (verb: boolean, message: string) => {
    setErrors({ error: verb, errMessage: message });
  };

  const btnTaps = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 300);
  };

  const getColor = (rating: number, index: number) => {
    if (rating >= index + 1) {
      // Color for rated stars
      return 'rated';
    }
    // Color for unrated stars
    return 'noRating';
  };

  const uploadFilesToServer = async (file: any) => {
    // get the upload file
    if (file) {
      // apend the uploaded file
      const formData = new FormData();
      formData.append('file', file);

      // eslint-disable-next-line no-useless-catch
      try {
        // Add it to the endpoint body
        const resp = await API.uploadFiles(formData);

        // return the response and used as wished
        return resp;
      } catch (error) {
        throw error;
      }
    }
  };

  // Search function
  const handleSearch = (
    data: any[],
    searchQuery: string,
    setData: Dispatch<SetStateAction<any[]>>,
    key: string,
  ) => {
    if (data && data?.length > 0) {
      const filtered =
        searchQuery !== ''
          ? data?.filter((item) =>
              item[key]?.toLowerCase()?.includes(searchQuery?.toLowerCase()),
            )
          : data;
      setData(filtered);
    }
  };

  const handleCandidateSearch = (
    data: any[],
    searchQuery: string,
    setData: Dispatch<SetStateAction<any[]>>,
    key: string,
  ) => {
    if (data && data?.length > 0) {
      const filtered =
        searchQuery !== ''
          ? data?.filter((item) =>
              item?.user[key]
                ?.toLowerCase()
                ?.includes(searchQuery?.toLowerCase()),
            )
          : data;
      setData(filtered);
    }
  };

  return {
    handleShow,
    handleError,
    show,
    setShow,
    btnTaps,
    getColor,
    loading,
    setLoading,
    errors,
    setErrors,
    open,
    setOpen,
    uploadFilesToServer,
    handleSearch,
    handleCandidateSearch,
  };
};
