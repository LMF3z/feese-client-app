import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ReactDatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import { getPaymentsHistoryCompany } from '../../API/employees/employeesPayments.api';
import useLoading from '../../components/hooks/useLoading';
import storage from '../../utils/handleLocal';
import timeFunctions, {
  addAndRestDaysToDate,
  convertDateToFormatLocalTime,
} from '../../utils/handleTimes';
import Button from '../../components/Button';
import Loading from '../../assets/Icons/Loading';
import { locale, routes } from '../../constants';
import useAuth from '../../components/hooks/auth/useAuth';

const headers = ['empleado', 'pagado', 'tipo de pago', 'fecha', 'acciones'];
const limitDate = new Date(timeFunctions.getActualDate());

const PaymentsWorkersHistories = () => {
  let navigate = useNavigate();

  const { buildSuccessResponse } = useAuth();

  const { isLoading, toggleLoading } = useLoading();

  const [initialDate, setInitialDate] = useState(
    addAndRestDaysToDate(limitDate, -8)
  );
  const [finishDate, setFinishDate] = useState(limitDate);
  const [flagPaymentType, setFlagPaymentType] = useState('all');
  const [paymentsHistory, setPaymentsHistory] = useState([]);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    let data = {};

    try {
      toggleLoading(true);

      const data_company_or_sucursal = await storage.getDataCompany();

      data.id_company = data_company_or_sucursal?.id_company
        ? data_company_or_sucursal?.id_company
        : null;

      data.initialDate = convertDateToFormatLocalTime(initialDate);
      data.finishDate = convertDateToFormatLocalTime(finishDate);
      data.flag = flagPaymentType;

      const response = await getPaymentsHistoryCompany(data);

      const dataRes = buildSuccessResponse(response);

      !dataRes.success && toast.error(dataRes.msg);

      dataRes.success && setPaymentsHistory(dataRes.data.data);

      toggleLoading(false);
    } catch (error) {
      toast.error('Error al registrar nuevo pago.');
      toggleLoading(false);
    }
  };

  return (
    <div className='container_section'>
      <h1>Historial de pagos</h1>

      <div className='w-full mt-5 min-h-20 flex flex-col justify-between items-center space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:grid-rows-1 md:gap-3'>
        <div className='w-full'>
          <label className=''>Fecha inicial</label>
          <ReactDatePicker
            className='input w-full'
            selected={initialDate}
            onChange={(date) => setInitialDate(date)}
            locale={locale}
            maxDate={limitDate}
            showTimeSelect={false}
            dateFormat='dd-MM-yyyy'
          />
        </div>
        <div className='w-full'>
          <label className=''>Fecha final</label>
          <ReactDatePicker
            className='input w-full'
            selected={finishDate}
            onChange={(date) => setFinishDate(date)}
            locale={locale}
            maxDate={limitDate}
            showTimeSelect={false}
            dateFormat='dd-MM-yyyy'
          />
        </div>
      </div>

      <div className='w-full mt-1 flex flex-col justify-center items-start'>
        <label>Filtrar por tipo de pago</label>
        <select
          className='select w-full'
          onChange={(e) => setFlagPaymentType(e.target.value)}
        >
          <option value='all'>Todos</option>
          <option value='unPayment'>Por pagar</option>
          <option value='paid'>Pagados</option>
        </select>
      </div>

      <Button
        type='button'
        label='Buscar'
        classes='my-3'
        handleClick={getHistory}
      />

      {isLoading && <Loading />}

      {paymentsHistory.length > 0 ? (
        <table className='custom_table'>
          <thead className='custom_thead'>
            <tr className='custom_tr_thead'>
              {headers.map((header, index) => (
                <th key={index} className='custom_th_thead'>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='custom_tbody'>
            {paymentsHistory.map((payment) => (
              <tr key={payment?.id} className='custom_tr_tbody'>
                <td className='custom_td_tbody'>
                  {payment?.employee
                    ? payment?.employee.name_employee
                    : payment?.name_employee}{' '}
                  {payment?.employee
                    ? payment?.employee.last_name_employee
                    : payment?.last_name_employee}
                </td>
                <td className='custom_td_tbody font-bold text-white'>
                  $
                  {payment?.employee
                    ? payment?.payment_amount.toFixed(2)
                    : payment.totalToPay}
                </td>
                <td className='custom_td_tbody'>
                  {payment?.payment_type === 'complete'
                    ? 'Pago completo'
                    : payment?.payment_type === 'unPayment'
                    ? 'Por pagar'
                    : 'Adelanto'}
                </td>
                {payment?.payment_type !== 'unPayment' && (
                  <td className='custom_td_tbody'>{payment?.createdAt}</td>
                )}
                <td className='custom_td_tbody_button'>
                  {payment?.payment_type !== 'unPayment' ? (
                    <Button
                      type='button'
                      label='Ver'
                      classes='w-2/5 md:w-1/2 lg:w-[90%] h-7 md:h-8 mx-auto md:my-0'
                      handleClick={() =>
                        navigate(
                          `${routes.detailsPaymentWorker}/${payment?.id}`
                        )
                      }
                    />
                  ) : (
                    <Button
                      type='button'
                      label='Pagar'
                      classes='w-2/5 md:w-1/2 lg:w-[90%] h-7 md:h-8 mx-auto md:my-0'
                      handleClick={() =>
                        navigate(`${routes.paymentsWorkers}/${payment?.id}`)
                      }
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className='w-full md:w-3/5 mt-5 p-10 flex justify-center items-center'>
          <label>Sin resultados.</label>
        </div>
      )}
    </div>
  );
};

export default PaymentsWorkersHistories;
