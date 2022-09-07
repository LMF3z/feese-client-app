import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import {
  SwipeableList,
  SwipeableListItem,
} from '@sandstreamdev/react-swipeable-list';
import ReactPaginate from 'react-paginate';

import { routes } from '../../constants';
import {
  annularOrder,
  getOrdersByRangeDates,
} from '../../API/orders/orders.api';
import ContainerModalContext from '../../components/ContainerModalContext';
import Loading from '../../assets/Icons/Loading';
import SeeIcon from '../../assets/Icons/SeeIcon';
import images from '../../assets/images';
import Button from '../../components/Button';
import ItemOrdersListSwip from '../../components/ItemOrdersListSwip';
import storage from '../../utils/handleLocal';
import timeFunctions, {
  addAndRestDaysToDate,
  convertDateToFormatLocalTime,
} from '../../utils/handleTimes';
import ModalAuthorization from '../../components/ModalAuthorization';
import usePaginate from '../../components/hooks/paginate/usePaginate';
import useAuth from '../../components/hooks/auth/useAuth';
import ButtonForPagination from '../../components/ButtonForPagination';

const limitDate = new Date(timeFunctions.getActualDate());

const Orders = () => {
  let navigate = useNavigate();

  const { SetNumPages, pageCount, handleChangePage, offset } = usePaginate();

  const { buildSuccessResponse } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [initialDate, setInitialDate] = useState(
    addAndRestDaysToDate(limitDate, -8)
  );
  const [finishDate, setFinishDate] = useState(limitDate);
  const [ordersList, setOrdersList] = useState({});
  const [orderSelectedToAnnular, setOrderSelectedToAnnular] = useState(null);

  useEffect(() => {
    getOrdersByDates();
  }, []);

  useEffect(() => {
    getOrdersByDates();
  }, [offset]);

  const getOrdersByDates = async () => {
    setIsLoading(true);
    try {
      const data_company_or_sucursal = storage.getDataCompany();
      const response = await getOrdersByRangeDates(
        data_company_or_sucursal.id_company,
        convertDateToFormatLocalTime(initialDate),
        convertDateToFormatLocalTime(finishDate),
        offset
      );

      const res = buildSuccessResponse(response);

      res.success && setOrdersList(res.data);
      res.success && SetNumPages(res.data.count);

      setIsLoading(false);
    } catch (error) {
      toast.error('Error al buscar ordenes');
      setIsLoading(false);
    }
  };

  const SeeOrderDetails = (order) => {
    return navigate(`${routes.receipt}/${order.num_control}/${true}`);
  };

  const annularOrderById = async () => {
    setIsLoading(true);
    try {
      const response = await annularOrder(orderSelectedToAnnular);
      const res = buildSuccessResponse(response);
      res.success ? toast.success(res.msg) : toast.error(res.msg);
      setAlertModal(false);
      getOrdersByDates();
      setIsLoading(false);
    } catch (error) {
      toast.error('Error al anular ordener');
      setIsLoading(false);
      setAlertModal(false);
    }
  };

  if (alertModal) {
    return (
      <ContainerModalContext
        classes="md:w-1/2 lg:w-1/3 bg-custom_bg"
        onCloseModal={() => setAlertModal(false)}
      >
        <ModalAuthorization
          handleAccept={annularOrderById}
          handleCancel={() => setAlertModal(false)}
          message="¿Seguro que desea anular la orden?"
        />
      </ContainerModalContext>
    );
  }

  return (
    <article className="container_section">
      <h1>Historial de Ordenes</h1>

      <section className="w-full flex flex-col justify-start items-start space-y-2 mt-2 p-2 border-2 border-borderBaseColor rounded-lg">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="text-sm text-smoothTextColor">
            <p>
              Total generado:{' '}
              <span className="text-lg text-white">
                ${ordersList?.totalPaymentsOrders}
              </span>
            </p>
            <p>
              Total pagos:{' '}
              <span className="text-lg text-white">
                ${ordersList?.totalPayments}
              </span>
            </p>
            <p>
              Total gastos:{' '}
              <span className="text-lg text-white">
                ${ordersList?.expendituresTotal}
              </span>
            </p>
          </div>
        )}
      </section>

      <div className="w-full mt-5 min-h-20 flex flex-col justify-between items-center space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:grid-rows-1 md:gap-3">
        <div className="w-full">
          <label className="">Fecha inicial</label>
          <DatePicker
            className="input"
            selected={initialDate}
            onChange={(date) => setInitialDate(date)}
            locale="es"
            maxDate={limitDate}
            showTimeSelect={false}
            dateFormat="dd-MM-yyyy"
          />
        </div>
        <div className="w-full">
          <label className="">Fecha final</label>
          <DatePicker
            className="input"
            selected={finishDate}
            onChange={(date) => setFinishDate(date)}
            locale="es"
            maxDate={limitDate}
            showTimeSelect={false}
            dateFormat="dd-MM-yyyy"
          />
        </div>
      </div>

      <Button
        type="button"
        label="Buscar"
        classes="my-3"
        handleClick={getOrdersByDates}
      />

      {/* <div className="w-full h-10 mt-3 flex justify-end items-center">
          
        </div> */}

      {isLoading && <Loading />}

      {ordersList?.rows?.length === 0 ? (
        <div className="w-full mt-5 p-10 flex justify-center items-center">
          <label>Sin resultados.</label>
        </div>
      ) : (
        <>
          <div className="w-full max-h-60vh drop-shadow-2xl overflow-x-visible sm:overflow-x-hidden overflow-y-scroll z-0">
            <SwipeableList>
              {ordersList?.rows?.map((order) => (
                <SwipeableListItem
                  key={order.id}
                  blockSwipe={order.state_null}
                  swipeLeft={{
                    content: (
                      <div className="w-full h-full pr-5 bg-white-600 flex justify-end items-center">
                        <img
                          src={images.forbidden}
                          alt="saving-icon"
                          className="w-8 h-8"
                        />
                      </div>
                    ),
                    action: () => {
                      setAlertModal(true);
                      setOrderSelectedToAnnular(order.id);
                    },
                  }}
                  swipeRight={{
                    content: (
                      <div className="w-full h-full pl-5 bg-blue flex justify-start items-center">
                        <SeeIcon color="#fff" classes="lg:w-8 lg:h-8" />
                      </div>
                    ),
                    action: () => SeeOrderDetails(order),
                  }}
                >
                  <ItemOrdersListSwip orderItem={order} />
                </SwipeableListItem>
              ))}
            </SwipeableList>
          </div>

          <ReactPaginate
            previousLabel={<ButtonForPagination>&lt;</ButtonForPagination>}
            nextLabel={<ButtonForPagination>&gt;</ButtonForPagination>}
            breakLabel={'...'}
            pageCount={pageCount}
            pageRangeDisplayed={5}
            renderOnZeroPageCount={null}
            onPageChange={({ selected }) => handleChangePage(selected)}
            containerClassName="w-full mt-3 flex justify-evenly items-center"
            previousClassName={'p-2'}
            nextClassName={''}
            pageClassName={''}
            breakClassName={''}
            activeClassName={'text-buttonSuccessColor'}
          />
        </>
      )}
    </article>
  );
};

export default Orders;
