import { useState, useEffect, useContext } from 'react';
import storage from '../../../utils/handleLocal';
import servicesAPI from '../../../API/services/services.api';
import {
  getClientsByQuery,
  getServicesByQuery,
} from '../../../utils/handleRequest';
import toast from 'react-hot-toast';
import Loading from '../../../assets/Icons/Loading';
import { ContextApp } from '../../../Store/ContextApp';
import types from '../../../Store/contextTypes';
import ContainerModalContext from '../../../components/ContainerModalContext';
import Button from '../../../components/Button';
import ItemServiceSelected from './components/ItemServiceSelected';
import AutoSuggest from '../../../components/AutoSuggest/AutoSuggest';
import ItemServiceAsig from './components/ItemServiceAsig';
import useAuth from '../../../components/hooks/auth/useAuth';
import ItemSuggest from '../../../components/AutoSuggest/components/ItemSuggest';
import ModalCreateClient from './components/ModalCreateClient';
import ModalAssignEmployee from './components/ModalAssignEmployee';
import ModalAssignmentsOrder from './components/ModalAssignmentsOrder';

const MainApp = () => {
  const { state, dispatch } = useContext(ContextApp);
  const { buildSuccessResponse } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [dataTableServices, setDataTableServices] = useState([]);
  const [showModalCreateClient, setShowModalCreateClient] = useState(false);
  const [showModalAssignmentEmployee, setShowModalAssignmentEmployee] =
    useState(false);
  const [showModalInvoice, setShowModalInvoice] = useState(false);

  useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    try {
      setIsLoading(true);

      const data_company_or_sucursal = await storage.getDataCompany();

      const id_company = data_company_or_sucursal?.id_company
        ? data_company_or_sucursal?.id_company
        : null;
      const id_branches = data_company_or_sucursal?.id_branches
        ? data_company_or_sucursal?.id_branches
        : null;

      const response = await servicesAPI.getServices({
        id_company,
        id_branches,
        offset: 0,
      });

      const servicesList = buildSuccessResponse(response);

      servicesList.success === false &&
        toast.error(servicesList.msg, { duration: 5000 });

      servicesList.success && setDataTableServices(servicesList.data.rows);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error('Error al obtener lista de servicios.', { duration: 5000 });
    }
  };

  const handleOpenModalAssignment = () => {
    if (!state.client_selected?.id) {
      return toast.error('Debe agregar, un cliente.');
    }

    if (state.services_selected.length <= 0) {
      return toast.error('Debe agregar, al menos, un servicio.');
    }

    const isAmountServicesValid = state.services_selected.find(
      (service) => +service.amount <= 0
    );

    if (isAmountServicesValid?.id) {
      return toast.error(
        'La cantidad de servicio a usar no puede ser cero (0).'
      );
    }

    setShowModalAssignmentEmployee(true);
  };

  const getClients = async (query) => {
    const response = await getClientsByQuery(query);
    return response;
  };

  const searchServices = async (query) => {
    const response = await getServicesByQuery(query);
    return response;
  };

  const handleRenderClientsFetchFunction = (item) => ({
    id: item['id'],
    name: item['name_client'],
    last_name: item['last_name_client'],
    identification: item['identification_client'],
    phone: item['phone_client'],
  });

  const handleRenderServicesFetchFunction = (item) => ({
    id: item['id'],
    name: item['name_service'],
    name_service: item['name_service'],
    price_service: item['price_service'],
    isActive: item['isActive'],
    id_company: item['id_company'],
    id_branches: item['id_branches'],
  });

  const renderItemClient = (item) => {
    return (
      <ItemSuggest>
        <span className='capitalize'>
          {item.name} - {item.last_name}
        </span>
      </ItemSuggest>
    );
  };

  const renderItemService = (item) => {
    return (
      <ItemSuggest>
        <span className='capitalize'>{item.name_service}</span>
      </ItemSuggest>
    );
  };

  const handleSelectClient = async (client) => {
    dispatch({ type: types.ADD_CLIENT_ORDER, payload: client });
    toast.success('Cliente seleccionado con ??xito.');
  };

  const handleSelectService = async (service) => {
    delete service.name;
    dispatch({ type: types.ADD_SERVICE_ORDER, payload: service });
    toast.success('Servicio seleccionado con ??xito.');
  };

  if (isLoading) {
    return <Loading />;
  }

  if (showModalCreateClient) {
    return (
      <ContainerModalContext
        title='Crear cliente'
        onCloseModal={() => setShowModalCreateClient(false)}
        classes='md:w-1/2 bg-primaryColor'
      >
        <ModalCreateClient closeModal={() => setShowModalCreateClient(false)} />
      </ContainerModalContext>
    );
  }

  if (showModalAssignmentEmployee) {
    return (
      <ContainerModalContext
        title='Asigne a un empleado'
        onCloseModal={() => setShowModalAssignmentEmployee(false)}
        classes='md:w-1/2 bg-primaryColor'
      >
        <ModalAssignEmployee
          closeModal={() => {
            setShowModalAssignmentEmployee(false);
            setShowModalInvoice(true);
          }}
        />
      </ContainerModalContext>
    );
  }

  if (showModalInvoice) {
    return (
      <ContainerModalContext
        title='Seleccione m??todo de pago'
        onCloseModal={() => setShowModalInvoice(false)}
        classes='md:w-1/2 bg-primaryColor'
      >
        <ModalAssignmentsOrder closeModal={() => setShowModalInvoice(false)} />
      </ContainerModalContext>
    );
  }

  return (
    <div className='container_section'>
      <div className='w-full text-center'>
        <h1>Asignaciones</h1>

        <div className='w-full flex justify-end items-center py-2 pl-2 mt-2'>
          <Button
            type='button'
            handleClick={() => setShowModalCreateClient(true)}
            label='Crear cliente'
            classes='w-3/5 md:w-[30%]'
          />
        </div>
        <div className='w-full h-10 mt-1'>
          <AutoSuggest
            inputProps={{ placeholder: 'Buscar clientes' }}
            onFetchFunction={getClients}
            renderFetchFunction={handleRenderClientsFetchFunction}
            onCallbackFunction={handleSelectClient}
            renderItem={renderItemClient}
          />
        </div>
      </div>

      <div className='mt-3 text-xl'>
        <label>Servicios:</label>
      </div>
      <div className='w-full h-10 my-3'>
        <AutoSuggest
          inputProps={{ placeholder: 'Buscar servicios' }}
          onFetchFunction={searchServices}
          renderFetchFunction={handleRenderServicesFetchFunction}
          onCallbackFunction={handleSelectService}
          renderItem={renderItemService}
        />
      </div>

      <section className='w-full min-h-10vh max-h-40vh overflow-x-hidden overflow-y-auto grid grid-flow-row md:grid-cols-2 gap-2 cursor-pointer'>
        {dataTableServices.map((service) => (
          <ItemServiceAsig key={service.id} service={service} />
        ))}
      </section>

      <div className='mt-3 text-xl'>
        <label>Servicios seleccionados:</label>
      </div>

      {state.services_selected.length <= 0 ? (
        <div className='w-full flex justify-center items-center'>
          <label>Nada a??n...</label>
        </div>
      ) : (
        <section className='w-full min-h-10vh max-h-40vh overflow-x-hidden overflow-y-auto grid grid-flow-row md:grid-cols-2 cursor-pointer'>
          {state.services_selected.map((service) => (
            <ItemServiceSelected key={service.id} service={service} />
          ))}
        </section>
      )}

      <div className='w-full p-2 mt-3'>
        <label className='font-bold text-xl'>
          Total a pagar:{' '}
          <span className='text-white'>${state.total_to_pay_order}</span>
        </label>
      </div>

      <Button
        type='button'
        handleClick={handleOpenModalAssignment}
        label='Asignar'
        classes='my-3'
      />
    </div>
  );
};

export default MainApp;
