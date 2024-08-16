import React, { ReactNode } from 'react';
import PopUp from '../popUps/PopUp';
import { BsXLg } from 'react-icons/bs';
import './Style.scss';

interface IRejecrOrder {
  id: string;
  close: () => void;
  action?: () => void;
  btnMainClass: string;
  btnSecClass: string;
  title: string;
  subTitle: string;
  actionTitle: string | ReactNode;
  icon: ReactNode;
}

const UpdateAccount: React.FC<IRejecrOrder> = ({
  id,
  close,
  action,
  btnMainClass,
  btnSecClass,
  title,
  subTitle,
  actionTitle,
  icon,
}) => {
  return (
    <PopUp id={id}>
      <section className='flex flex-col updateAccount w-11/12 md:w-5/12 animate__animated animate__bounceIn container p-4'>
        <header className='flex justify-end w-full'>
          <button onClick={close}>
            <BsXLg />
          </button>
        </header>
        <article className='flex flex-col justify-center text-center '>
          <div className='mx-auto'>{icon}</div>
          <h3 className=' mt-3'>{title}</h3>
          <p className='w-full md:w-8/12 mx-auto'>{subTitle}</p>
        </article>

        <article className='mt-5 flex justify-center gap-3 '>
          <button onClick={close} className={btnSecClass}>
            Cancel
          </button>
          <button className={btnMainClass} type='button' onClick={action}>
            {actionTitle}
          </button>
        </article>
      </section>
    </PopUp>
  );
};

export default UpdateAccount;
