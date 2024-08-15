import { TabProps } from '@/Interfaces/GlobalInterfaces';
import { FaEdit } from 'react-icons/fa';
import { FaRegTrashCan } from 'react-icons/fa6';

const HelpTabTitle = ({
  id,
  title,
  activeTab,
  deleteAction,
  setActiveTab,
  editAction,
  activeClass,
  notActiveClass,
  imageUrl,
}: TabProps & { editAction: () => void; deleteAction: () => void }) => {
  const handTabSwitch = (id: string) => {
    if (setActiveTab) {
      setActiveTab(id);
    }
  };

  return (
    <button
      key={id}
      onClick={() => handTabSwitch(id)}
      className={activeTab === id ? activeClass : notActiveClass}
    >
      <hgroup
        id={id}
        className={
          imageUrl ? 'flex flex-col justify-center gap-3 items-center' : ''
        }
      >
        <figure className='rounded-lg w-[40px] h-[40px] overflow-hidden'>
          <img src={imageUrl} alt='' className='!w-full !h-full object-cover' />
        </figure>

        <h4>{title}</h4>
        <div className='flex-1 flex justify-end items-center gap-3'>
          <button className='text-pryColor' onClick={editAction}>
            <FaEdit />
          </button>
          <button className='text-negative' onClick={deleteAction}>
            <FaRegTrashCan />
          </button>
        </div>
      </hgroup>
    </button>
  );
};

export default HelpTabTitle;
