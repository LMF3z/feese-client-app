import { useState } from 'react';
import Loading from '../assets/Icons/Loading';
import Button from './Button';

const ModalAuthorization = ({ handleAccept, handleCancel, message }) => {
  const [isLoading, setIsLoading] = useState(false);

  const acceptFunction = () => {
    setIsLoading(true);
    handleAccept();
  };

  return (
    <section className='w-full min-h-full h-60 flex flex-col justify-between items-center'>
      <h1 className='text-3xl text-center mx-auto text-white'>{message}</h1>

      <div className='w-full h-28 flex flex-col justify-center items-center space-y-3'>
        <Button
          label='Si, Estoy seguro'
          classes='bg-red-600 text-white hover:bg-red-700'
          handleClick={acceptFunction}
        />
        <Button label='No, cancelar' handleClick={handleCancel} />
      </div>

      {isLoading && <Loading />}
    </section>
  );
};

export default ModalAuthorization;
