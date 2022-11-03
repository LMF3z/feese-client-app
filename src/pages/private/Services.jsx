import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  SwipeableList,
  SwipeableListItem,
} from '@sandstreamdev/react-swipeable-list';
import ReactPaginate from 'react-paginate';

import validationServices from '../../validations/form.services';
import servicesAPI from '../../API/services/services.api';
import Loading from '../../assets/Icons/Loading';
import Button from '../../components/Button';
import ShowErrorForm from '../../components/ShowErrorForm';
import storage from '../../utils/handleLocal';
import ContainerModalContext from '../../components/ContainerModalContext';
import ModalAuthorization from '../../components/ModalAuthorization';
import EditIcon from '../../assets/Icons/EditIcon';
import TrashIcon from '../../assets/Icons/TrashIcon';
import ItemServiceListSwip from '../../components/ItemServiceListSwip';
import usePaginate from '../../components/hooks/paginate/usePaginate';
import useAuth from '../../components/hooks/auth/useAuth';
import ButtonForPagination from '../../components/ButtonForPagination';
import InputWithLabel from '../../components/InputWithLabel';

const Services = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationServices.FormServicesSchema),
  });

  // pagination
  const { SetNumPages, pageCount, handleChangePage, offset } = usePaginate();

  const { buildSuccessResponse } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [dataTableServices, setDataTableServices] = useState([]);

  useEffect(() => {
    getServices();
  }, []);

  useEffect(() => {
    getServices();
  }, [offset]);

  const createService = async (data) => {
    if (isEditMode) {
      updateService(data);
      return;
    }

    delete data.id;

    try {
      setIsLoading(true);

      const data_company_or_sucursal = await storage.getDataCompany();

      data.id_company = data_company_or_sucursal?.id_company
        ? data_company_or_sucursal?.id_company
        : null;
      data.id_branches = data_company_or_sucursal?.id_branches
        ? data_company_or_sucursal?.id_branches
        : null;

      const response = await servicesAPI.registerService(data);

      const registerData = buildSuccessResponse(response);

      registerData.success
        ? toast.success(registerData.msg, { duration: 5000 })
        : toast.error(registerData.msg, { duration: 5000 });

      registerData.success && reset();

      registerData.success && (await getServices());

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error('Error al registrar servicio.', { duration: 5000 });
    }
  };

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
        offset: offset,
      });

      const servicesList = buildSuccessResponse(response);

      servicesList.success === false &&
        toast.error(servicesList.msg, { duration: 5000 });

      servicesList.success && setDataTableServices(servicesList.data.rows);
      servicesList.success && SetNumPages(servicesList.data.count);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error('Error al obtener lista de servicios.', { duration: 5000 });
    }
  };

  const handleEditMode = (service) => {
    setIsEditMode(true);
    setValue('id', service.id);
    setValue('name_service', service.name_service);
    setValue('price_service', service.price_service);
  };

  const updateService = async (data) => {
    try {
      setIsLoading(true);

      const response = await servicesAPI.updateService(data);

      const updatedData = buildSuccessResponse(response);

      updatedData.success
        ? toast.success(updatedData.msg, { duration: 5000 })
        : toast.error(response.msg, { duration: 5000 });

      updatedData.success && reset();

      updatedData.success && (await getServices());

      setIsLoading(false);
      setIsEditMode(false);
    } catch (error) {
      setIsLoading(false);
      toast.error('Error al actualizar empleado.', { duration: 5000 });
    }
  };

  const deleteService = async () => {
    try {
      setIsLoading(true);

      const response = await servicesAPI.deleteService({
        id_service: serviceToDelete.id,
        id_company: serviceToDelete.id_company,
        id_branches: serviceToDelete.id_branches,
      });

      const servicesDeleted = buildSuccessResponse(response);

      servicesDeleted.success
        ? toast.success(servicesDeleted.msg, { duration: 5000 })
        : toast.error(servicesDeleted.msg, { duration: 5000 });
      servicesDeleted.success && setAlertModal(false);

      await getServices();

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error('Error al obtener lista de servicios.', { duration: 5000 });
    }
  };

  if (alertModal) {
    return (
      <ContainerModalContext
        classes='md:w-1/2 lg:w-1/3 bg-secondaryColor'
        onCloseModal={() => setAlertModal(false)}
      >
        <ModalAuthorization
          handleAccept={deleteService}
          handleCancel={() => setAlertModal(false)}
          message='¿Seguro que desea eliminar este servicio?'
        />
      </ContainerModalContext>
    );
  }

  return (
    <div className='container_section'>
      <h1 className='text-2xl'>Servicios</h1>
      <form
        onSubmit={handleSubmit(createService)}
        className='w-full mt-3 grid grid-rows-3 gap-3 min-h-10vh'
      >
        {isEditMode ? <input type='hidden' {...register('id')} /> : null}
        <section className='container_square_form'>
          <div className='w-full md:w-1/2'>
            <InputWithLabel
              label='Nombre del servicio'
              type='text'
              name='name_service'
              register={register}
            />
            {errors?.name_service?.message && (
              <ShowErrorForm label={errors?.name_service?.message} />
            )}
          </div>
        </section>
        <section className='container_square_form md:mt-3'>
          <div className='w-full md:w-1/2'>
            <InputWithLabel
              label='Costo del servicio'
              type='number'
              step='0.01'
              min={'0.01'}
              name='price_service'
              register={register}
            />
            {errors?.price_service?.message && (
              <ShowErrorForm label={errors?.price_service?.message} />
            )}
          </div>
        </section>
        <div className='w-full md:col-span-2 h-10 flex justify-end items-center space-x-3'>
          {isEditMode && (
            <Button
              label='Cancelar'
              type='button'
              classes='w-2/5 md:w-[30%]'
              handleClick={() => {
                reset();
                setIsEditMode(false);
              }}
            />
          )}
          <Button label='Guardar' classes='w-2/5 md:w-[30%]' />
        </div>
      </form>

      {isLoading && <Loading />}

      {dataTableServices.length === 0 ? (
        <div className='w-full mt-5 p-10 flex justify-center items-center'>
          <label>Sin resultados.</label>
        </div>
      ) : (
        <>
          <div className='w-full max-h-65vh mt-5 rounded-lg drop-shadow-2xl overflow-x-visible sm:overflow-x-hidden overflow-y-scroll z-10'>
            <SwipeableList>
              {dataTableServices.map((serviceItem) => (
                <SwipeableListItem
                  key={serviceItem.id}
                  swipeLeft={{
                    content: (
                      <div className='w-full h-full pr-5 bg-red-600 flex justify-end items-center'>
                        <TrashIcon color='#fff' classes='lg:w-8 lg:h-8' />
                      </div>
                    ),
                    action: () => {
                      setServiceToDelete(serviceItem);
                      setAlertModal(true);
                    },
                  }}
                  swipeRight={{
                    content: (
                      <div className='w-full h-full pl-5 bg-blue flex justify-start items-center'>
                        <EditIcon color='#fff' classes='lg:w-8 lg:h-8' />
                      </div>
                    ),
                    action: () => handleEditMode(serviceItem),
                  }}
                >
                  <ItemServiceListSwip serviceItem={serviceItem} />
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
            containerClassName='w-full mt-3 flex justify-evenly items-center'
            previousClassName={'p-2'}
            nextClassName={''}
            pageClassName={''}
            breakClassName={''}
            activeClassName={'text-buttonSuccessColor'}
          />
        </>
      )}
    </div>
  );
};

export default Services;
