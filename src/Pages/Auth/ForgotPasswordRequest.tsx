import FormInput from '@/components/FormInput';
import * as Yup from 'yup';
import * as API from '@/api/apis';
import { useFormik } from 'formik';
import Spinner from '@/spinner/Spinner';
import { useGlobalHooks } from '@/Hooks/globalHooks';
import BrandLogo from '@/components/BrandLogo';
import ErrorMessage from '@/components/ErrorMessage';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import GoBackBtn from '@/components/GoBackBtn';

const initialValues = {
  email: '',
};

const ForgotPasswordRequest = () => {
  const {
    errors: customErrors,
    handleError,
    setLoading,
    loading,
  } = useGlobalHooks();
  const navigate = useNavigate();

  const onSubmit = async (formData: { email: string }) => {
    setLoading(() => ({ ['login']: true }));
    API.requestPasswordChange(formData)
      .then((res) => {
        const successMessage = {
          success: true,
          message: res.data.message,
        };
        toast.success(successMessage.message);
        setLoading(() => ({ ['login']: false }));

        navigate('/reset-password');
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

  const signUpSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email address is required'),
  });

  const { touched, errors, handleBlur, handleChange, handleSubmit } = useFormik(
    {
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit,
    },
  );

  return (
    <main className={`  min-h-screen py-10`}>
      <section className=' w-11/12 md:w-4/12 mx-auto bg-white rounded-lg p-5 py-10'>
        {' '}
        <GoBackBtn className='outline-btn' />
        <div className='flex justify-center my-10'>
          <BrandLogo className='w-10/12 md:w-3/12' />
        </div>
        <form onSubmit={handleSubmit}>
          <hgroup>
            <h3 className='font-bold  '>Reset with Email Address</h3>
            <h5 className='text-grey1'>
              Please enter your email address to request a password reset
            </h5>
          </hgroup>
          <article className=' w-full mt-5'>
            <FormInput
              id='email'
              name='email'
              type='email'
              label='Email Address'
              labelClassName='text-black font-medium'
              placeholder='Enter your email address'
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
            />
          </article>
          <article className='mt-10'>
            <button className='main-btn w-full' type='submit'>
              {loading['fpass'] ? <Spinner /> : ' Reset Password'}
            </button>
          </article>

          <div className='flex justify-center mt-6'>
            {customErrors.error && (
              <ErrorMessage message={customErrors.errMessage} />
            )}
          </div>
        </form>
      </section>
    </main>
  );
};

export default ForgotPasswordRequest;
