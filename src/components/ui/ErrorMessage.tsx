/* eslint @typescript-eslint/no-explicit-any: "off" */

import { PiWarningOctagon } from 'react-icons/pi';

const ErrorMessage = ({ message }: { message: any }) => {
  return (
    <div className='error_message  flex items-center gap-2 font-semi-bold animate__animated animate__bounceIn'>
      <div>
        <PiWarningOctagon />
      </div>
      <p className='error_message '> {message}</p>
    </div>
  );
};

export default ErrorMessage;
