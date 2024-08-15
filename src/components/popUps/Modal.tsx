import React, { ReactNode, useEffect, useRef } from 'react';

import { useAppSelector } from '@/Redux/reduxHooks';
import { selectGlobal } from '@/Redux/Features/globalSlice';
import { useGlobalHooks } from '@/Hooks/globalHooks';

interface PopUpProps {
  id: string;
  className: string;
  children: ReactNode;
}
const Modal: React.FC<PopUpProps> = ({ id, className, children }) => {
  const show = useAppSelector(selectGlobal);
  const { handleShow } = useGlobalHooks();
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleDocumentClick = (e: any) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleShow(id);
      }
    };

    if (show[id]) {
      // Add the event listener when the component mounts
      document.addEventListener('mousedown', handleDocumentClick);

      // Remove the event listener when the component unmounts or when the modal is hidden
      return () => {
        document.removeEventListener('mousedown', handleDocumentClick);
      };
    }
  }, [show, handleShow, id]);

  return (
    <>
      {show[id] && (
        <div id={id} className={className} ref={modalRef}>
          {children}
        </div>
      )}
    </>
  );
};

export default Modal;
