import BrandLogo from '@/components/BrandLogo';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as API from '@/api/apis';
import { useGlobalHooks } from '@/Hooks/globalHooks';
import Spinner from '@/spinner/Spinner';
import FormInput from '@/components/FormInput';
import ErrorMessage from '@/components/ErrorMessage';

import { toast } from 'react-hot-toast';
import { useAppSelector } from '@/Redux/reduxHooks';
import { selectUserData } from '@/Redux/Features/userAuthSlice';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  otp: '',
  password: '',
  password_confirmation: '',
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const { authUser } = useAppSelector(selectUserData);

  const {
    errors: customErrors,
    handleError,
    setLoading,
    loading,
  } = useGlobalHooks();

  const onSubmit = async (formData: {
    otp: string;
    password: string;
    password_confirmation: string;
  }) => {
    setLoading(() => ({ ['login']: true }));

    API.resetPassword(formData)
      .then((res) => {
        const successMessage = {
          success: true,
          message: res.data.message,
        };
        toast.success(successMessage.message);
        console.log(res);
        setLoading(() => ({ ['login']: false }));

        navigate('/signin');
      })
      .catch((err) => {
        const erroMessage = {
          success: false,
          message:
            err && err.response
              ? err.response.data.message
              : 'We encountered an error',
        };

        console.log(erroMessage);
        setLoading(() => ({ ['login']: false }));

        handleError(true, erroMessage.message);
      });
  };

  const passwordSchema = Yup.object().shape({
    password: Yup.string()
      .required(
        'Password must include number and special chars, number and minimum of 8 chars',
      )
      .min(8, ' Must be Minimum of 8 Characters')
      .matches(/^(?=.*[a-z])/, ' Must Contain One Lowercase Character')
      .matches(/^(?=.*[A-Z])/, '  Must Contain One Uppercase Character')
      .matches(/^(?=.*[0-9])/, '  Must Contain One Number Character')
      .matches(
        /^(?=.*[!@#$%^&*])/,
        '  Must Contain  One Special Case Character',
      ),

    password_confirmation: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Your passwords does not match'),

    otp: Yup.string().required('OTP Code is required'),
  });

  const { errors, touched, handleBlur, handleChange, handleSubmit } = useFormik(
    {
      initialValues: initialValues,
      validationSchema: passwordSchema,
      onSubmit,
    },
  );

  return (
    <main className={` min-h-screen py-7`}>
      <header className='container flex mb-5'>
        <BrandLogo />
      </header>
      <section className='grid place-items-center bg-white rounded-md px-3 py-6 md:px-8 w-11/12 lg:w-5/12 mx-auto min-h-[350px]'>
        <h5 className='text-center font-bold mb-5'>Reset Password</h5>

        <form onSubmit={handleSubmit}>
          <hgroup>
            <h3 className='font-bold  '>Create New Password</h3>
            <h5 className='text-grey1 my-3'>
              Please enter Code sent to{' '}
              <span className='text-black'> {authUser?.userEmail}</span> and
              your new password to secure your account
            </h5>
          </hgroup>
          <article className=' w-full mt-5'>
            <FormInput
              id='otp'
              name='otp'
              type='number'
              label='OTP'
              placeholder='Enter the code sent to your email'
              labelClassName='text-black font-medium'
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.otp && errors.otp}
            />
          </article>
          <article className=' w-full my-5'>
            <FormInput
              id='password'
              name='password'
              type='password'
              label='Password'
              placeholder='Enter your password'
              labelClassName='text-black font-medium'
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && errors.password}
            />
          </article>
          <article className=' w-full'>
            <FormInput
              id='password_confirmation'
              name='password_confirmation'
              type='password'
              label='Confirm Password'
              placeholder='Enter your password'
              labelClassName='text-black font-medium'
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.password_confirmation && errors.password_confirmation
              }
            />
          </article>
          <article className='mt-4'>
            <button className='main-btn w-full' type='submit'>
              {loading['rpass'] ? <Spinner /> : ' Reset Password'}
            </button>
          </article>
        </form>

        <div className='flex justify-center mt-2'>
          {customErrors.error && (
            <ErrorMessage message={customErrors.errMessage} />
          )}
        </div>
      </section>
    </main>
  );
};

export default ChangePassword;
