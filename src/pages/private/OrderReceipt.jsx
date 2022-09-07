import { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import { useNavigate, useParams } from 'react-router-dom';
import CalendarIcon from '../../assets/Icons/CalendarIcon';
import CheckedIcon from '../../assets/Icons/CheckedIcon';
import EnvelopIcon from '../../assets/Icons/EnvelopIcon';
import UserIcon from '../../assets/Icons/UserIcon';
import Button from '../../components/Button';
import { colors, routes } from '../../constants';
import orderApi from '../../API/orders/orders.api';
import toast from 'react-hot-toast';
import Loading from '../../assets/Icons/Loading';
import CallIcon from '../../assets/Icons/PhoneIcon';
import ServicesIcon from '../../assets/Icons/ServicesIcon';
import useAuth from '../../components/hooks/auth/useAuth';

const OrderReceipt = () => {
  let { id, s } = useParams();
  let navigate = useNavigate();

  const { buildSuccessResponse } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [orderData, setOrderData] = useState({});

  useEffect(() => {
    getDataOrder();
  }, []);

  const getDataOrder = async () => {
    try {
      const response = await orderApi.getOrderByNumControl(id);
      const orderRes = buildSuccessResponse(response);
      orderRes.success && setOrderData(orderRes.data);
      setIsLoading(false);
    } catch (error) {
      toast.error('Error al obtener datos de la orden');
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    html2canvas(document.querySelector('#capture')).then((canvas) => {
      let image = canvas.toDataURL('image/png');
      let link = document.createElement('a');
      link.download = `${id}-${new Date(
        orderData.createdAt
      ).toLocaleDateString()}.png`;
      link.href = image;
      link.click();
      window.navigator.vibrate(200);
    });
  };

  const noBackButton = () => {
    window.location.hash = 'no-back-button';
    window.location.hash = 'Again-No-back-button';
    window.onhashchange = function () {
      window.location.hash = 'no-back-button';
    };
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container_section">
      <div
        id="capture"
        className="w-full min-h-50vh flex flex-col justify-between items-center mt-1 border-2 border-borderBaseColor bg-primaryColor rounded-lg p-3"
      >
        <div className="w-full md:w-3/4 text-center">
          <h1>Detalle de la orden</h1>
          <p className="text-xl">Numero: {orderData.num_control}</p>
        </div>

        <CheckedIcon
          classes="w-20 h-20 my-5"
          color={colors.theme_primary_color}
        />
        <div className="my-5 text-center">
          <label>Has cancelado: </label>
          <h1>${orderData.total_payment.toFixed(2)}</h1>
        </div>

        <section className="w-full flex flex-col space-y-2">
          <div className="flex justify-start items-center space-x-2">
            <UserIcon classes="w-6 h-6" />
            <label>
              {orderData.client.name_client} {orderData.client.last_name_client}
            </label>
          </div>
          <div className="flex justify-start items-center space-x-2">
            <CallIcon classes="w-6 h-6" />
            <label>{orderData.client.phone_client}</label>
          </div>
          <div className="flex justify-start items-center space-x-2">
            <CalendarIcon classes="w-6 h-6" />
            <label>
              {orderData.createdAt} {orderData.hour}
            </label>
          </div>
          <div className="flex justify-start items-center space-x-2">
            <EnvelopIcon classes="w-6 h-6" />
            <label>Tipos de pagos:</label>
          </div>
          <div className="flex flex-col justify-start items-start text-center pl-5">
            {orderData?.cash > 0 && (
              <p>
                Efectivo:{' '}
                <label className="font-bold">
                  ${orderData.cash.toFixed(2)}
                </label>
              </p>
            )}
            {orderData?.cash > 0 && (
              <p>
                Cambio:{' '}
                <label className="font-bold">
                  ${orderData.cashChange.toFixed(2)}
                </label>
              </p>
            )}
            {orderData?.card > 0 && (
              <p>
                Tarjeta:{' '}
                <label className="font-bold">
                  ${orderData.card.toFixed(2)}
                </label>
              </p>
            )}
            {orderData?.transfer > 0 && (
              <p>
                Transferencia:{' '}
                <label className="font-bold">
                  ${orderData.transfer.toFixed(2)}
                </label>
              </p>
            )}
          </div>
          {JSON.parse(s) && (
            <div className="w-full flex flex-col justify-start items-center">
              <div className="w-full flex justify-start items-center space-x-2">
                <ServicesIcon classes="w-6 h-6" />
                <label>Servicios:</label>
              </div>
              <div className="w-full flex flex-col justify-start items-start text-center pl-5 text-lg">
                {orderData.services.map((service) => (
                  <p key={service.id}>
                    {service?.name_service} -{' '}
                    <label className="font-bold">
                      ${service?.price_service?.toFixed(2)}
                    </label>
                  </p>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      <div className="w-full flex flex-col justify-center items-center mt-2">
        <Button
          label="Guardar comprobante"
          type="button"
          classes="h-12"
          handleClick={handleExport}
        />
      </div>

      <div className="w-full flex flex-col justify-center items-center mt-2">
        <Button
          label="Nueva orden"
          type="button"
          classes="h-12"
          handleClick={() => {
            navigate(routes.app);
            noBackButton();
          }}
        />
      </div>
    </div>
  );
};

export default OrderReceipt;
