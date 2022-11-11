import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getDetailsEmployeePayment } from '../../../API/employees/employeesPayments.api';
import useLoading from '../../../components/hooks/useLoading';
import UserIcon from '../../../assets/Icons/UserIcon';
import CallIcon from '../../../assets/Icons/PhoneIcon';
import CalendarIcon from '../../../assets/Icons/CalendarIcon';
import EnvelopIcon from '../../../assets/Icons/EnvelopIcon';
import Button from '../../../components/Button';
import Loading from '../../../assets/Icons/Loading';
import html2canvas from 'html2canvas';
import useAuth from '../../../components/hooks/auth/useAuth';

const DetailsEmployeePayment = () => {
  let { id } = useParams();
  const { buildSuccessResponse } = useAuth();

  const { isLoading, toggleLoading } = useLoading();

  const [paymentDetail, setPaymentDetail] = useState({});

  useEffect(() => {
    getPaymentDetails();
  }, []);

  const handleExport = () => {
    html2canvas(document.querySelector('#capture')).then((canvas) => {
      let image = canvas.toDataURL('image/png');
      let link = document.createElement('a');
      link.download = `${id}-${new Date(
        paymentDetail.createdAt
      ).toLocaleDateString()}.png`;
      link.href = image;
      link.click();
    });
  };

  const getPaymentDetails = async () => {
    toggleLoading(true);
    try {
      const response = await getDetailsEmployeePayment(id);
      const resData = buildSuccessResponse(response);

      setPaymentDetail(resData.data);

      toggleLoading(false);
    } catch (error) {
      toast.error('Error al obtener detalles del pago');
      toggleLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='container_section'>
      <div
        id='capture'
        className='w-full min-h-50vh flex flex-col justify-between items-center mt-1 border-2 border-borderBaseColor bg-primaryColor rounded-lg p-3'
      >
        <div className='w-full md:w-3/4 text-center'>
          <h1>Detalles del pago</h1>
          <p className='text-xl'>Numero: {paymentDetail.num_payment}</p>
        </div>

        <img src='/checked-icon.png' alt='check' className='w-28 h-28 my-5' />

        <div className='text-center'>
          <label>Cancelado:</label>{' '}
          <h1>${paymentDetail?.payment_amount?.toFixed(2)}</h1>
        </div>

        <section className='flex flex-col space-y-2'>
          <div className='flex items-center justify-start space-x-5'>
            <UserIcon classes='w-6 h-6' />
            <span>
              {paymentDetail?.employee?.name_employee}{' '}
              {paymentDetail?.employee?.last_name_employee}
            </span>
          </div>
          <div className='flex items-center justify-start space-x-5'>
            <CallIcon classes='w-6 h-6' />
            <span>{paymentDetail?.employee?.phone_employee}</span>
          </div>
          <div className='flex items-center justify-start space-x-5'>
            <CalendarIcon classes='w-6 h-6' />
            <span>
              {paymentDetail.createdAt} {paymentDetail.hour}
            </span>
          </div>
          <div className='flex items-center justify-start space-x-5'>
            <EnvelopIcon classes='w-6 h-6' />
            <span>
              Tipos de pago:{' '}
              {paymentDetail.payment_type === 'advance'
                ? 'Adelanto'
                : 'Pago completo'}
            </span>
          </div>
        </section>
      </div>

      <div className='w-full flex flex-col justify-center items-center mt-5'>
        <Button
          label='Guardar comprobante'
          type='button'
          classes='h-12'
          handleClick={handleExport}
        />
      </div>
    </div>
  );
};

export default DetailsEmployeePayment;
