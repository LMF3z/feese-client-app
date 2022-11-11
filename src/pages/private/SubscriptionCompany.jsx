import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormMembershipCompanySchema } from '../../validations/form.membershipCompany';
import {
  getDataCurrentMembership,
  saveMembershipPayment,
} from '../../API/companies/membershipCompanies.api';
import Loading from '../../assets/Icons/Loading';
import Button from '../../components/Button';
import useAuth from '../../components/hooks/auth/useAuth';
import InputWithLabel from '../../components/InputWithLabel';
import ShowErrorForm from '../../components/ShowErrorForm';
import toast from 'react-hot-toast';
import { getDateWithOutTime } from '../../utils/handleTimes';

const SubscriptionCompany = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormMembershipCompanySchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const { isAuth, buildSuccessResponse } = useAuth();

  const [memberShipData, setMemberShipData] = useState();

  useEffect(() => {
    getMembershipData();
  }, []);

  const getMembershipData = async () => {
    try {
      setIsLoading(true);

      const response = await getDataCurrentMembership(isAuth.id_company);
      const data = buildSuccessResponse(response);

      if (!data.success) {
        setIsLoading(false);
        return toast.error(data.msg);
      }

      setMemberShipData({
        priceMembership: data?.data?.priceMembership,
        rateDollar: data?.data?.rateDollar,
        totalToPay: data?.data?.totalToPayment,
        stateMembership: data?.data?.stateMembership,
        lastDatePayment: data?.data?.lastDatePayment,
        nextPaymentDate: data?.data?.nextPaymentDate
          ? data?.data?.nextPaymentDate.split('T')[0]
          : '',
      });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const saveNewPaymentCompanyMembership = async (data) => {
    if (!memberShipData.rateDollar) {
      return toast.error(
        'No se puede registrar pago sin la tasa del dolar. Intente después'
      );
    }

    if (Number(data.amount_payment_membership) < memberShipData.totalToPay) {
      return toast.error('La cantidad pagada es menor a la requerida.');
    }

    data.id_company = isAuth.id_company;
    data.dollar_value = memberShipData.rateDollar;

    try {
      setIsLoading(true);

      const response = await saveMembershipPayment(data);
      const dataRes = buildSuccessResponse(response);

      dataRes.success ? toast.success(dataRes.msg) : toast.error(dataRes.msg);
      dataRes.success && reset();
      dataRes.success && (await getMembershipData());

      setIsLoading(false);
    } catch (error) {
      toast.error('Error al registrar pago. Intente más tarde.');
      setIsLoading(false);
    }
  };

  return (
    <div className='container_section'>
      <h1>Detalles de tu suscripción</h1>

      <section className='w-full flex flex-col justify-start items-start space-y-2 my-5 p-2 border-2 border-borderBaseColor rounded-lg'>
        {isLoading ? (
          <Loading />
        ) : (
          <div className='flex flex-col text-sm text-smoothTextColor'>
            <label>
              Costo membresia:{' '}
              <span className='text-lg text-white'>
                $
                {memberShipData?.priceMembership
                  ? memberShipData?.priceMembership?.toFixed(2)
                  : '0'}
              </span>
            </label>
            <label>
              Estado:{' '}
              <span className='text-lg text-white'>
                {memberShipData?.stateMembership}
              </span>
            </label>

            {memberShipData?.lastDatePayment && (
              <label>
                Ultimo Pago:{' '}
                <span className='text-lg text-white'>
                  {getDateWithOutTime(memberShipData?.lastDatePayment)}
                </span>
              </label>
            )}

            {memberShipData?.nextPaymentDate && (
              <label>
                Próximo Pago:{' '}
                <span className='text-lg text-white'>
                  {getDateWithOutTime(memberShipData?.nextPaymentDate)}
                </span>
              </label>
            )}

            <label>
              Tasa del día:{' '}
              <span className='text-lg text-white'>
                Bs.{' '}
                {memberShipData?.rateDollar
                  ? memberShipData?.rateDollar?.toFixed(2)
                  : '0'}
              </span>
            </label>
            <label>
              Total a pagar:{' '}
              <span className='text-lg text-white'>
                Bs.{memberShipData?.totalToPay?.toFixed(2)}
              </span>
            </label>
          </div>
        )}
      </section>

      {isLoading && <Loading />}

      <form
        onSubmit={handleSubmit(saveNewPaymentCompanyMembership)}
        className='form_container'
      >
        <div className='container_square_form md:flex md:justify-evenly md:items-center md:space-x-3'>
          <div className='w-full md:w-1/2'>
            <InputWithLabel
              label='N° referencia'
              type='number'
              placeholder='12345678'
              name='reference_transfer'
              register={register}
            />
            {errors?.reference_transfer?.message && (
              <ShowErrorForm label={errors?.reference_transfer?.message} />
            )}
          </div>
          <div className='w-full md:w-1/2 mt-3 lg:mt-0'>
            <InputWithLabel
              label='Cantidad Cancelada.'
              type='number'
              placeholder='0.00'
              name='amount_payment_membership'
              register={register}
            />
            {errors?.amount_payment_membership?.message && (
              <ShowErrorForm
                label={errors?.amount_payment_membership?.message}
              />
            )}
            {errors?.dollar_value?.message && (
              <ShowErrorForm label={errors?.dollar_value?.message} />
            )}
          </div>
        </div>

        <Button label='Guardar' classes='my-3' />
      </form>
    </div>
  );
};

export default SubscriptionCompany;
