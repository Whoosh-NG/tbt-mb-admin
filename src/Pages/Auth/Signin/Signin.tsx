import './login-screen.css';
import FormInput from '@/components/FormInput';
import * as Yup from 'yup';
import * as API from '@/api/apis';
import { useFormik } from 'formik';
import { ISignIn } from '@/Interfaces/Auth';
import { useAppDispatch } from '@/Redux/reduxHooks';
import { useCookies } from '@/Hooks/cookiesHook';
import Spinner from '@/spinner/Spinner';
import { useGlobalHooks } from '@/Hooks/globalHooks';
import { Link, useNavigate } from 'react-router-dom';
import BrandLogo from '@/components/BrandLogo';
import { userAuthData } from '@/Redux/Features/userAuthSlice';
import ErrorMessage from '@/components/ErrorMessage';
import toast from 'react-hot-toast';

const initialValues = {
  email: '',
  password: '',
};

const Signin = () => {
  const dispatch = useAppDispatch();
  const { setCookies } = useCookies();

  const navigate = useNavigate();
  const {
    errors: customErrors,
    setErrors,
    loading,
    setLoading,
  } = useGlobalHooks();

  const onSubmit = async (userData: ISignIn) => {
    setLoading(() => ({ ['login']: true }));
    API.SignIn(userData)
      .then((res) => {
        const successMessage = {
          success: true,
          message: res.data?.message,
        };
        const userToken = res?.data?.data?.access_token;
        const userId = res?.data?.data?.id;
        const userEmail = res?.data?.data?.email;
        const userName = res?.data?.data?.full_name;

        setCookies('whooshNgToken', userToken);

        toast.success(successMessage.message);

        dispatch(userAuthData({ userId, userEmail, userName }));
        setLoading(() => ({ ['login']: false }));
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        const erroMessage = {
          success: false,
          message:
            err && err.response
              ? err.response.data.message
              : 'We encountered an error',
        };
        setLoading(() => ({ ['login']: false }));

        setErrors({ error: true, errMessage: erroMessage.message });
      });
  };

  const signUpSchema = Yup.object().shape({
    password: Yup.string().required('Field cannot be empty'),
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
    <main className=' grid place-items-center min-h-screen '>
      <section className=' w-11/12 md:w-8/12 lg:w-5/12 mx-auto bg-white rounded-lg p-5 py-10'>
        <div className='flex justify-center mb-4'>
          <BrandLogo className='w-10/12 md:w-3/12' />
        </div>
        <section className='text-center flex flex-col gap-3'>
          <h3 className=''>Welcome Back, Kindly Login</h3>

          <form onSubmit={handleSubmit}>
            <article className=' w-full '>
              <FormInput
                id='email'
                name='email'
                type='email'
                label='Email Address'
                placeholder='Enter your email address'
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
                required
              />
            </article>
            <article className=' w-full mt-3'>
              <FormInput
                id='password'
                name='password'
                type='password'
                label='Password'
                placeholder='Create a strong password'
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && errors.password}
                required
              />
            </article>

            <article className='mt-5 w-full '>
              <button
                style={{ boxShadow: '0px 8px 20px 0px #4E60FF29' }}
                className='main-btn w-full'
                type='submit'
              >
                {loading['login'] ? <Spinner /> : 'Login'}
              </button>

              <div className='text-center   w-full mt-3'>
                <Link
                  to='/forgot-password'
                  className='font-semibold text-[var(--pryColor)]  '
                >
                  Forgot password
                </Link>
              </div>
            </article>

            <div className='flex flex-col items-center justfy-center w-full mt-5'>
              {!loading['login'] && customErrors.error && (
                <ErrorMessage message={customErrors.errMessage} />
              )}
            </div>
          </form>
        </section>
      </section>
    </main>
  );
};

export default Signin;
