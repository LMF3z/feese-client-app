import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../../constants';
import orderApi from '../../../../API/orders/orders.api';
import Loading from '../../../../assets/Icons/Loading';
import { ContextApp } from '../../../../Store/ContextApp';
import calcFunctions from '../../../../utils/calc';
import storage from '../../../../utils/handleLocal';
import { buildSuccessResponse } from '../../../../utils/handleRequest';
import timeFunctions from '../../../../utils/handleTimes';
import Button from '../../../../components/Button';
import types from '../../../../Store/contextTypes';

const ModalAssignmentsOrder = ({ closeModal }) => {
  let navigate = useNavigate();

  const { state, dispatch } = useContext(ContextApp);

  const [isLoading, setIsLoading] = useState(false);
  const [change, setChange] = useState(0);
  const [dataPayment, setDataPayment] = useState({
    cash: '',
    card: '',
    transfer: '',
  });

  const handleChangeTypePayment = ({ target }) => {
    const { name, value } = target;

    if (name === 'cash') {
      const change =
        +value > state.total_to_pay_order
          ? value - state.total_to_pay_order
          : 0;
      setChange(change);
    }

    setDataPayment({ ...dataPayment, [name]: +value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state.employees_selected.length <= 0) {
      return toast.error('Seleccione un empleado.');
    }

    const totalSum = calcFunctions.addAmountsForObjects(dataPayment);

    if (
      dataPayment.cash === totalSum &&
      dataPayment.cash < state.total_to_pay_order
    ) {
      return toast.error(
        'Total de efectivo no puede ser menor al total de la orden.'
      );
    }

    if (dataPayment.cash >= state.total_to_pay_order && dataPayment.card > 0) {
      return toast.error(
        'El total de las cantidades puede ser mayor cuando es un pago total en efectivo.'
      );
    }

    if (totalSum < state.total_to_pay_order) {
      return toast.error(
        'Cantidades a pagar no pueden ser menor al total de la orden'
      );
    }

    if (
      dataPayment.cash < state.total_to_pay_order &&
      totalSum > state.total_to_pay_order
    ) {
      return toast.error(
        'El total de las cantidades puede ser mayor cuando es un pago total en efectivo.'
      );
    }

    setIsLoading(true);

    try {
      const dataCompany = storage.getDataCompany();

      const data = {
        ...dataPayment,
        cashChange: change,
        id_company:
          dataCompany.isCompany || dataCompany?.id_company
            ? dataCompany.id_company
            : null,
        id_branches: dataCompany?.isBranch ? dataCompany.branch_company : null,
        user_id: dataCompany?.isUser ? dataCompany.id_user : null,
        createdAt: timeFunctions.getActualDateFormat(),
        updatedAt: timeFunctions.getActualDateFormat(),
        client_selected: state.client_selected,
        services_selected: state.services_selected,
        employee_selected: state.employees_selected,
        total_payment: state.total_to_pay_order,
      };

      const response = await orderApi.createOrder(data);
      const orderRes = buildSuccessResponse(response);

      orderRes.success
        ? toast.success(orderRes.msg)
        : toast.error(orderRes.msg);
      orderRes.success &&
        setTimeout(() => {
          dispatch({ type: types.RESET_DATA_TO_ORDER });
          navigate(`${routes.receipt}/${orderRes.data.num_control}/${false}`);
        }, 2000);
      setIsLoading(false);
    } catch (error) {
      toast.error('Error al crear orden.');
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full text-white'>
      {isLoading && <Loading />}
      <div className='w-full flex flex-col justify-center items-start space-y-2 md:col-span-2 font-bold my-3'>
        <label>Total a pagar: ${state.total_to_pay_order}</label>
        <label>Vuelto: ${change.toFixed(2)}</label>
        {/* <label>Tipo de pago:</label> */}
      </div>

      <form
        onSubmit={handleSubmit}
        className='form_container'
        autoComplete='off'
      >
        <article className='w-full min-h-10vh lg:h-70vh max-h-40vh overflow-x-hidden overflow-y-auto'>
          <section className='grid gap-3 grid-cols-1 grid-flow-row md:grid-cols-2 cursor-pointer'>
            <div className='flex flex-col justify-center items-start'>
              <label>Efectivo</label>
              <input
                type='number'
                min='0'
                step='0.01'
                name='cash'
                className='input w-full text-base'
                placeholder='0.00'
                onChange={handleChangeTypePayment}
                value={dataPayment.cash}
              />
            </div>

            <div className='flex flex-col justify-center items-start'>
              <label>Punto de venta</label>
              <input
                type='number'
                min='0'
                step='0.01'
                name='card'
                className='input w-full text-base'
                placeholder='0.00'
                onChange={handleChangeTypePayment}
                value={dataPayment.card}
              />
            </div>

            <div className='flex flex-col justify-center items-start'>
              <label>Transferencia</label>
              <input
                type='number'
                min='0'
                step='0.01'
                name='transfer'
                className='input w-full text-base'
                placeholder='0.00'
                onChange={handleChangeTypePayment}
                value={dataPayment.transfer}
              />
            </div>
          </section>
        </article>
        <div className='w-full h-10 mt-3 flex justify-end items-center'>
          <Button
            type='submit'
            handleClick={() => {}}
            label='Procesar'
            classes='text-base w-[50%] md:w-[35%]'
          />
        </div>
      </form>
    </div>
  );
};

export default ModalAssignmentsOrder;
