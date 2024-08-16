import { useGlobalHooks } from '@/Hooks/globalHooks';
import { AddNewAdminError, AdminProps } from '@/Interfaces/Admin';
import { useAddNewAdminMutation } from '@/api/apiSlice';
import React, { useState } from 'react';

import { BsFillEyeFill, BsFillEyeSlashFill, BsX } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import PopUp from '@/components/popUps/PopUp';
import Spinner from '@/spinner/Spinner';
import ErrorMessage from '@/components/ErrorMessage';

const initialState = {
  full_name: '',
  email: '',
  password: '',
  adminRole: '',
};

type PasswordTypeState = {
  [id: string]: boolean;
};

const AddAdmin: React.FC<AdminProps> = ({ id, close }) => {
  const [formData, setFormData] = useState(initialState);
  const [addAdmin, { isLoading }] = useAddNewAdminMutation();
  const { errors, setErrors, handleShow } = useGlobalHooks();
  const [passwordType, setPasswordType] = useState<PasswordTypeState>({});

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showPassword = (id: string) => {
    setPasswordType((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const rsp = await addAdmin(formData);
      console.log(rsp);
      if ('data' in rsp) {
        toast.success(rsp.data.message);
        handleShow(id);
        setFormData(initialState);
      } else if ('error' in rsp && 'data' in rsp.error) {
        const er = (rsp?.error as AddNewAdminError)?.data?.message;
        setErrors({
          error: true,
          errMessage: er,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PopUp id={id}>
      <form
        className='newPop w-11/12 md:w-5/12 mx-auto py-5 animate__animated animate__bounceIn'
        onSubmit={handleSubmit}
      >
        <article className='w-10/12 mx-auto flex items-center justify-between '>
          <h4 className='font-bold'>Add Administrator</h4>
          <div>
            <button onClick={close} className='close'>
              <BsX size={20} />
            </button>
          </div>
        </article>
        <ul className='w-10/12 mx-auto my-3 flex flex-wrap gap-2'>
          <li className='mb-3 inputWrapper'>
            <label htmlFor='full_name'>Full Name</label>
            <input
              type='text'
              placeholder='Enter full name'
              className='form-control'
              name='firstName'
              onChange={handleChange}
              required
            />
          </li>

          <li className='mb-3 inputWrapper'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              placeholder='Enter email'
              className='form-control'
              name='email'
              onChange={handleChange}
              required
            />
          </li>

          <li className='mb-3 inputWrapper'>
            <label htmlFor='password'>Password</label>
            <div className='inputContainer'>
              <input
                id='password'
                type={!passwordType['password'] ? 'password' : 'text'}
                name='password'
                placeholder='Enter password'
                className='form-control'
                defaultValue={formData.password}
                onChange={handleChange}
                required
              />

              <div onClick={() => showPassword('password')} className='icon'>
                {!passwordType['password'] ? (
                  <BsFillEyeSlashFill className='text-Grey3' />
                ) : (
                  <BsFillEyeFill className='text-Grey3' />
                )}
              </div>
            </div>
          </li>

          <li className='inputWrapper'>
            <label htmlFor='role'>Role</label>

            <select
              id='adminRole'
              name='adminRole'
              className='form-control !w-full'
              onChange={handleChange}
              required
            >
              <option value=''>Select admin role</option>
              <option value='super'>Super Admin</option>
              <option value='sub'>Administrator</option>
            </select>
          </li>
        </ul>

        <article className='w-10/12 mx-auto flex items-center gap-3'>
          <button className='outline-btn' type='button' onClick={close}>
            Cancel
          </button>
          <button className='main-btn' type='submit'>
            {isLoading ? <Spinner /> : 'Save'}
          </button>
        </article>

        <div className='flex justify-center my-2'>
          {errors.error && <ErrorMessage message={errors.errMessage} />}
        </div>
      </form>
    </PopUp>
  );
};

export default AddAdmin;
