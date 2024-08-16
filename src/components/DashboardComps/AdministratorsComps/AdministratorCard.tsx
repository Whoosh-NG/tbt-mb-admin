import { useDeleteAdminMutation } from '@/api/apiSlice';
import { useGlobalHooks } from '@/Hooks/globalHooks';
import { selectGlobal } from '@/Redux/Features/globalSlice';
import { useAppSelector } from '@/Redux/reduxHooks';
import toast from 'react-hot-toast';
import EditAdmin from './EditAdmin';
import UpdateAccount from '@/components/UpdateAccount/UpdateAccount';
import Spinner from '@/spinner/Spinner';
import { BinIcon, EditIcon, TrashIcon } from '@/SVGs/CustomSVGs';

export const AdministratorCard = ({
  id,
  fullName,
  email,
  role,
}: {
  id: number;
  fullName: string;
  email: string;
  role?: string;
}) => {
  const { handleShow } = useGlobalHooks();

  const toggle = useAppSelector(selectGlobal);
  const [freez, { isLoading }] = useDeleteAdminMutation();

  const deactivateAdmin = async () => {
    try {
      const rsp = await freez(id);

      if ('data' in rsp) {
        toast.success(rsp.data.message);
        handleShow(`del-${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ul className='assign flex flex-wrap items-center justify-between w-full'>
        <li className='w-full md:w-4/12'>
          <h4>{fullName}</h4>
        </li>
        <li className='w-full md:w-3/12'>
          <h6>{email}</h6>
        </li>

        <li className='w-full md:w-2/12'>
          <h6>{role}</h6>
        </li>
        <li className='w-full md:w-3/12 flex  justify-between'>
          <button
            className='adminEdit flex items-center gap-2 text-pryColor'
            onClick={() => handleShow(`edit-${id}`)}
          >
            <EditIcon fill='var(--pryColor)' />
            <span>Edit</span>
          </button>
          <button
            className='adminDeactivate flex items-center gap-2 text-negative'
            onClick={() => handleShow(`del-${id}`)}
          >
            <TrashIcon /> <span>Deactivate</span>
          </button>
        </li>
      </ul>

      {toggle[`edit-${id}`] && (
        <EditAdmin
          id={`edit-${id}`}
          adminId={id}
          close={() => handleShow(`edit-${id}`)}
        />
      )}
      {toggle[`del-${id}`] && (
        <UpdateAccount
          id={`del-${id}`}
          icon={<BinIcon fill='var(--negative)' />}
          close={() => handleShow(`del-${id}`)}
          title='Deactivate Account'
          subTitle="Are you sure you want to deactivate this admin's account?"
          actionTitle={isLoading ? <Spinner /> : 'Deactivate'}
          btnMainClass='main-btn !bg-negative '
          btnSecClass='outline-btn '
          action={deactivateAdmin}
        />
      )}
    </>
  );
};
