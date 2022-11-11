import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import Switch from 'react-switch';
import { colors, routes } from '../../../constants';
import FormEmployeePaymentSchema from '../../../validations/form.employeesPayments';
import Loading from '../../../assets/Icons/Loading';
import Button from '../../../components/Button';
import ShowErrorForm from '../../../components/ShowErrorForm';
import storage from '../../../utils/handleLocal';
import timeFunctions, {
  convertDateToFormatLocalTime,
} from '../../../utils/handleTimes';
import {
  getDataEmployeePayment,
  getEmployeePaymentsHistory,
  saveEmployeePayment,
} from '../../../API/employees/employeesPayments.api';
import useLoading from '../../../components/hooks/useLoading';
import usePaginate from '../../../components/hooks/paginate/usePaginate';
import useAuth from '../../../components/hooks/auth/useAuth';
import ReactPaginate from 'react-paginate';
import ButtonForPagination from '../../../components/ButtonForPagination';

const headers = ['pagado', 'tipo de pago', 'fecha', 'acciones'];
const actualDate = new Date(timeFunctions.getActualDate());

const PaymentsWorkers = () => {
  let { id } = useParams();
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormEmployeePaymentSchema.FormEmployeePaymentSchema),
  });

  const { SetNumPages, pageCount, handleChangePage, offset } = usePaginate();

  const { buildSuccessResponse } = useAuth();

  const { isLoading, toggleLoading } = useLoading();

  const [isCompletePayment, setIsCompletePayment] = useState(false);
  const [employeeData, setEmployeeData] = useState({});
  const [employeePaymentsHistory, setEmployeePaymentsHistory] = useState([]);

  useEffect(() => {
    getDataPayment();
    getHistoryListPayments();
  }, []);

  useEffect(() => {
    getHistoryListPayments();
  }, [offset]);

  const getDataPayment = async () => {
    toggleLoading(true);
    try {
      const response = await getDataEmployeePayment(
        id,
        convertDateToFormatLocalTime(actualDate)
      );

      const dataRes = buildSuccessResponse(response);

      dataRes.success === false && toast.error(dataRes.msg);

      dataRes.success && setEmployeeData(dataRes.data);

      toggleLoading(false);
    } catch (error) {
      toast.error('error al obtener datos del pago del empleado.');
      toggleLoading(false);
    }
  };

  const getHistoryListPayments = async () => {
    toggleLoading(true);
    try {
      const response = await getEmployeePaymentsHistory(id, offset);

      const dataRes = buildSuccessResponse(response);

      dataRes.success === false && toast.error(dataRes.msg);
      dataRes.success && setEmployeePaymentsHistory(dataRes.data.rows);
      dataRes.success && SetNumPages(dataRes.data.count);

      toggleLoading(false);
    } catch (error) {
      toast.error('Error al obtener historial de pagos.');
      toggleLoading(false);
    }
  };

  const sendNewPayment = async (data) => {
    if (
      data.payment_type === 'complete' &&
      +data.payment_amount !== +employeeData.totalToPay
    ) {
      return toast.error(
        'La cantidad a pagar no coincide con la cantidad ingresada.'
      );
    }

    if (data.payment_amount <= 0) {
      return toast.error('Total a pagar debe ser mayor a cero.');
    }

    toggleLoading(true);

    const data_company_or_sucursal = await storage.getDataCompany();

    data.id_company = data_company_or_sucursal?.id_company
      ? data_company_or_sucursal?.id_company
      : null;
    data.id_branches = data_company_or_sucursal?.id_branches
      ? data_company_or_sucursal?.id_branches
      : null;
    data.id_employee = +id;
    data.date = convertDateToFormatLocalTime(actualDate);
    data.totalGenerate = employeeData.totalGenerate;

    const response = await saveEmployeePayment(data);

    if (response.success === false) {
      toggleLoading(false);
      return toast.error(response.msg);
    }

    toast.success(response.msg);
    reset();
    getDataPayment();
    getHistoryListPayments();
    toggleLoading(false);
  };

  const handleTypePayment = () => {
    setIsCompletePayment(!isCompletePayment);
    setValue('payment_amount', employeeData.totalToPay);
    setValue('payment_type', isCompletePayment ? 'advance' : 'complete');
  };

  return (
    <div className='container_section'>
      <h1>Detalles de pagos</h1>

      <div className='w-full flex justify-start items-center space-x-5 mt-5 mb-1 text-white'>
        <label>Pago completo</label>
        <Switch
          className='react-switch'
          onChange={handleTypePayment}
          checked={isCompletePayment}
          offColor={colors.placeholderColor}
          onColor={colors.buttonSuccessColor}
          checkedIcon={false}
          uncheckedIcon={false}
        />
      </div>

      <form
        className='w-full min-h-10vh'
        onSubmit={handleSubmit(sendNewPayment)}
      >
        <section className='md:flex md:space-x-3'>
          <div className='w-full md:w-1/2'>
            <input
              type='number'
              min='0.01'
              step='0.01'
              className='input w-full text-base'
              placeholder='Cantidad a pagar'
              disabled={isCompletePayment}
              {...register('payment_amount')}
            />
            {errors?.payment_amount?.message && (
              <ShowErrorForm label={errors?.payment_amount?.message} />
            )}
          </div>
          <div className='w-full md:w-1/2 mt-2 md:mt-0'>
            <select
              className='select'
              disabled={isCompletePayment}
              {...register('payment_type')}
            >
              <option value='complete'>Pago completo</option>
              <option value='advance' selected>
                Adelanto
              </option>
            </select>
            {errors?.payment_type?.message && (
              <ShowErrorForm label={errors?.payment_type?.message} />
            )}
          </div>
        </section>
        <Button label='Procesar' classes='h-8' />
      </form>

      {Object.values(employeeData).length > 0 && (
        <div className='w-full flex flex-col justify-start items-start space-y-2 mt-5 p-2 border-2 border-borderBaseColor rounded-lg'>
          <section className='text-base text-smoothTextColor'>
            <p>
              Nombre: <label>{employeeData.name_employee}</label>
            </p>
            <p>
              Apellido: <label>{employeeData.last_name_employee}</label>
            </p>
            <p>
              Identificación:{' '}
              <label>{employeeData.identification_employee}</label>
            </p>

            <p>
              Pago fijo:{' '}
              <label>
                {employeeData.payment_type === 'fixed_payment'
                  ? '$' + employeeData.payment_amount
                  : '$0'}
              </label>
            </p>
            <p>
              Pago Porcentaje:{' '}
              <label>
                {employeeData.payment_type === 'percent_payment'
                  ? '%' + employeeData.payment_amount
                  : '%0'}
              </label>
            </p>

            <p>
              Último adelanto:{' '}
              <label>
                {employeeData?.lastPaymentAdvance?.id
                  ? employeeData.lastPaymentAdvance.last_date_advance_payment
                  : 'Nada aún'}
              </label>
            </p>
            <p>
              Monto último adelanto:{' '}
              <label>
                {employeeData?.lastPaymentAdvance?.id
                  ? '$' + employeeData.lastPaymentAdvance.payment_amount
                  : 'Nada aún'}
              </label>
            </p>
            <p>
              Total adelantos:{' '}
              <label>${employeeData.totalAmountAdvances}</label>
            </p>

            <p>
              Último pago:{' '}
              <label>
                {employeeData.lastPaymentComplete?.id
                  ? employeeData.lastPaymentComplete.last_date_complete_payment
                  : 'Nada aún.'}
              </label>
            </p>
            <p>
              Monto último pago:{' '}
              <label>
                {employeeData?.lastPaymentComplete?.id
                  ? '$' + employeeData.lastPaymentComplete.payment_amount
                  : 'Nada aún'}
              </label>
            </p>

            <p>
              Total generado:{' '}
              <label>
                $
                {employeeData.totalGenerate > 0
                  ? employeeData.totalGenerate.toFixed(2)
                  : employeeData.totalGenerate}
              </label>
            </p>
            <p>
              {employeeData.totalToPay < 0 ? (
                <>
                  Debe: <label>${employeeData.totalToPay}</label>
                </>
              ) : (
                <>
                  Total a pagar: <label>${employeeData.totalToPay}</label>
                </>
              )}
            </p>
          </section>
        </div>
      )}

      {isLoading && <Loading />}

      {employeePaymentsHistory.length > 0 ? (
        <>
          <table className='custom_table'>
            <thead className='custom_thead'>
              <tr className='custom_tr_thead'>
                {headers.map((header, index) => (
                  <th key={index} className='custom_th_thead'>
                    <label className='text-red-600'>{header}</label>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='custom_tbody'>
              {employeePaymentsHistory.map((payment) => (
                <tr key={payment.id} className='custom_tr_tbody'>
                  <td className='custom_td_tbody'>
                    ${payment.payment_amount.toFixed(2)}
                  </td>
                  <td className='custom_td_tbody'>
                    {payment.payment_type === 'complete'
                      ? 'Pago completo'
                      : 'Adelanto'}
                  </td>
                  <td className='custom_td_tbody'>{payment.createdAt}</td>
                  <td className='custom_td_tbody_button'>
                    <Button
                      type='button'
                      label='Ver'
                      classes='w-2/5 md:w-1/2 lg:w-[90%] h-7 md:h-8 mx-auto md:my-0'
                      handleClick={() =>
                        navigate(`${routes.detailsPaymentWorker}/${payment.id}`)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <ReactPaginate
            previousLabel={<ButtonForPagination>&lt;</ButtonForPagination>}
            nextLabel={<ButtonForPagination>&gt;</ButtonForPagination>}
            breakLabel={'...'}
            pageCount={pageCount}
            pageRangeDisplayed={5}
            renderOnZeroPageCount={null}
            onPageChange={({ selected }) => handleChangePage(selected)}
            containerClassName='w-full mt-3 flex justify-evenly items-center'
            previousClassName={'p-2'}
            nextClassName={''}
            pageClassName={''}
            breakClassName={''}
            activeClassName={'text-buttonSuccessColor'}
          />
        </>
      ) : (
        <div className='w-full mt-5 p-10 flex justify-center items-center'>
          <label>Sin resultados.</label>
        </div>
      )}
    </div>
  );
};

export default PaymentsWorkers;
