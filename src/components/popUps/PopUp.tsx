import React, { ReactNode, useEffect, useRef } from 'react';

import { selectGlobal } from '../../Redux/Features/globalSlice';
import { useSelector } from 'react-redux';
import './PopUp.scss';
import { useGlobalHooks } from '../../Hooks/globalHooks';

interface PopUpProps {
  id: string | number;
  children: ReactNode;
}

const PopUp: React.FC<PopUpProps> = ({ id, children }) => {
  const show = useSelector(selectGlobal);
  const { handleShow } = useGlobalHooks();
  const popupRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (e: any) => {
      if (popupRef.current === e.target) {
        handleShow(id);
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener('click', handleDocumentClick);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [id, handleShow]);

  return (
    <>
      {show[id] && (
        <div className='popUp_container' ref={popupRef}>
          {children}
        </div>
      )}
    </>
  );
};

export default PopUp;
