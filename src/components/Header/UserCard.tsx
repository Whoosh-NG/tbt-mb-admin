import userIcon from '@/assets/adminAvatar.png';
import { useGlobalHooks } from '@/Hooks/globalHooks';
import Logout from '@/Pages/Logout/Logout';
import { selectGlobal } from '@/Redux/Features/globalSlice';
import { selectUserData } from '@/Redux/Features/userAuthSlice';
import { useAppSelector } from '@/Redux/reduxHooks';
import { MdOutlineLogout } from 'react-icons/md';

const UserCard = () => {
  const { handleShow } = useGlobalHooks();
  const toggle = useAppSelector(selectGlobal);
  const { authUser } = useAppSelector(selectUserData);

  return (
    <>
      <section className='flex flex-col gap-4 text-center bg-white rounded-xl p-4 shadow-xl'>
        <h3 className='text-pryColor'>WhooshNG Admin</h3>
        <figure className='w-[60px] h-[60px] mx-auto'>
          <img src={userIcon} alt='' />
        </figure>

        <div>
          <h4>{authUser?.userName}</h4>
          <small className='text-Grey6'>{authUser?.userEmail}</small>
        </div>
        <button
          onClick={() => handleShow('logout')}
          className='main-btn flex items-center justify-center gap-3'
        >
          {' '}
          <MdOutlineLogout /> Log Out
        </button>
      </section>

      {toggle['logout'] && (
        <Logout id='logout' close={() => handleShow('logout')} />
      )}
    </>
  );
};

export default UserCard;
