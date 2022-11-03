import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  SwipeableList,
  SwipeableListItem,
} from '@sandstreamdev/react-swipeable-list';
import ReactPaginate from 'react-paginate';
import { locale } from '../../constants';
import FormExpenditureSchema from '../../validations/form.expenditure';
import Button from '../../components/Button';
import InputWithLabel from '../../components/InputWithLabel';
import ShowErrorForm from '../../components/ShowErrorForm';
import storage from '../../utils/handleLocal';
import {
  createNewExpenditure,
  deleteExpenditureById,
  getAllExpenditures,
  updateExpenditureById,
} from '../../API/expenditures/expenditures.api';
import toast from 'react-hot-toast';
import Loading from '../../assets/Icons/Loading';
import timeFunctions, {
  convertDateToFormatLocalTime,
} from '../../utils/handleTimes';
import EditIcon from '../../assets/Icons/EditIcon';
import TrashIcon from '../../assets/Icons/TrashIcon';
import ItemExpendListSwip from '../../components/ItemExpendListSwip';
import ContainerModalContext from '../../components/ContainerModalContext';
import ModalAuthorization from '../../components/ModalAuthorization';
import { getEnableCash } from '../../API/orders/orders.api';
import usePaginate from '../../components/hooks/paginate/usePaginate';
import useAuth from '../../components/hooks/auth/useAuth';
import ButtonForPagination from '../../components/ButtonForPagination';

const limitDate = new Date(timeFunctions.getActualDate());

const Expenditure = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormExpenditureSchema.FormExpenditureSchema),
  });

  const { SetNumPages, pageCount, handleChangePage, offset } = usePaginate();

  const { buildSuccessResponse } = useAuth();

  const [initialDate, setInitialDate] = useState(limitDate);
  const [finishDate, setFinishDate] = useState(limitDate);
  const [alertModal, setAlertModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expendToDelete, setExpendToDelete] = useState(null);
  const [enableCash, setEnableCash] = useState(null);
  const [dataTableExpenditures, setDataTableExpenditures] = useState([]);

  useEffect(() => {
    getEnableCashFromDb();
    getExpenditures();
  }, []);

  useEffect(() => {
    getEnableCashFromDb();
    getExpenditures();
  }, [offset]);

  const getEnableCashFromDb = async () => {
    try {
      setIsLoading(true);

      const data_company_or_sucursal = await storage.getDataCompany();

      const id_company = data_company_or_sucursal?.id_company
        ? data_company_or_sucursal?.id_company
        : null;

      const response = await getEnableCash(
        id_company,
        convertDateToFormatLocalTime(limitDate)
      );

      const enable = buildSuccessResponse(response);

      if (enable.success === false)
        return toast.error('Error al buscar efectivo disponible.');

      setEnableCash(+enable.data);
      setIsLoading(false);
    } catch (error) {
      toast.error('Error al obtener efectivo disponible');
      setIsLoading(false);
    }
  };

  const getExpenditures = async () => {
    try {
      setIsLoading(true);

      const data_company_or_sucursal = await storage.getDataCompany();

      const id_company = data_company_or_sucursal?.id_company
        ? data_company_or_sucursal?.id_company
        : null;
      const id_branches = data_company_or_sucursal?.id_branches
        ? data_company_or_sucursal?.id_branches
        : null;

      const response = await getAllExpenditures({
        id_company,
        id_branches,
        initialDate: convertDateToFormatLocalTime(initialDate),
        finishDate: convertDateToFormatLocalTime(finishDate),
        offset: offset,
      });

      const expendituresList = buildSuccessResponse(response);

      expendituresList.success === false &&
        toast.error(expendituresList.msg, { duration: 5000 });

      expendituresList.success &&
        setDataTableExpenditures(expendituresList.data.rows);
      expendituresList.success && SetNumPages(expendituresList.data.count);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error('Error al obtener lista de empleados.', { duration: 5000 });
    }
  };

  const sendExpenditure = async (data) => {
    if (isEditMode) {
      return updateExpenditure(data);
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

      data.createdAt = timeFunctions.getActualDateFormat();
      data.updatedAt = timeFunctions.getActualDateFormat();

      const response = await createNewExpenditure(data);

      const registerData = buildSuccessResponse(response);

      registerData.success
        ? toast.success(registerData.msg, { duration: 5000 })
        : toast.error(registerData.msg, { duration: 5000 });

      registerData.success && reset();

      registerData.success && (await getExpenditures());
      registerData.success && (await getEnableCashFromDb());

      setExpendToDelete(null);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error('Error al registrar empleado.', { duration: 5000 });
    }
  };

  const handleEditMode = async (expenditure) => {
    setIsEditMode(true);

    setValue('id', expenditure.id);
    setValue('description_expenditure', expenditure.description_expenditure);
    setValue('amount_article', expenditure.amount_article);
    setValue('cost_expenditure', expenditure.cost_expenditure);
  };

  const updateExpenditure = async (data) => {
    try {
      setIsLoading(true);

      const response = await updateExpenditureById(data);

      const updatedData = buildSuccessResponse(response);

      updatedData.success
        ? toast.success(updatedData.msg, { duration: 5000 })
        : toast.error(response.msg, { duration: 5000 });

      updatedData.success && reset();

      updatedData.success && (await getExpenditures());
      updatedData.success && (await getEnableCashFromDb());

      setIsLoading(false);
      setIsEditMode(false);
    } catch (error) {
      setIsLoading(false);
      toast.error('Error al actualizar gasto.', { duration: 5000 });
    }
  };

  const deleteExpenditureSwip = async () => {
    try {
      setIsLoading(true);

      const response = await deleteExpenditureById(expendToDelete);

      const registerData = buildSuccessResponse(response);

      registerData.success
        ? toast.success(registerData.msg, { duration: 5000 })
        : toast.error(registerData.msg, { duration: 5000 });

      registerData.success && (await getExpenditures());
      registerData.success && (await getEnableCashFromDb());

      setIsLoading(false);
      setAlertModal(false);
    } catch (error) {
      setIsLoading(false);
      setAlertModal(false);
      toast.error('Error al eliminar empleado.', { duration: 5000 });
    }
  };

  if (alertModal) {
    return (
      <ContainerModalContext
        classes='md:w-1/2 lg:w-1/3 bg-secondaryColor'
        onCloseModal={() => setAlertModal(false)}
      >
        <ModalAuthorization
          handleAccept={deleteExpenditureSwip}
          handleCancel={() => setAlertModal(false)}
          message='¿Seguro que desea eliminar este gasto?'
        />
      </ContainerModalContext>
    );
  }

  return (
    <div className='container_section'>
      <h1>Gastos</h1>

      <div className='w-full flex flex-col justify-start items-start text-red-600 mt-2 p-2 border-2 border-borderBaseColor rounded-lg'>
        <p>Los gastos serán debitados de la caja.</p>
        <p>
          En caso de no existir efectivo no se efectuará el registro del mismo.
        </p>
        <p className='text-green-600 mt-2'>
          Efectivo disponible:{' '}
          <span>${enableCash > 0 ? enableCash.toFixed(2) : enableCash}</span>
        </p>
      </div>

      <form
        onSubmit={handleSubmit(sendExpenditure)}
        className='form_container my-2'
      >
        {isEditMode && <input type='hidden' {...register('id')} />}
        <div className='container_square_form grid grid-cols-1 grid-rows-4 gap-3'>
          <div className=''>
            <InputWithLabel
              label='Descripción de gasto.'
              type='text'
              name='description_expenditure'
              register={register}
            />
            {errors?.description_expenditure?.message && (
              <ShowErrorForm label={errors?.description_expenditure?.message} />
            )}
          </div>
          <div className=''>
            <InputWithLabel
              label='Cantidad'
              type='number'
              name='amount_article'
              register={register}
            />
            {errors?.amount_article?.message && (
              <ShowErrorForm label={errors?.amount_article?.message} />
            )}
          </div>
          <div className=''>
            <InputWithLabel
              label='Costo'
              type='number'
              name='cost_expenditure'
              register={register}
            />
            {errors?.cost_expenditure?.message && (
              <ShowErrorForm label={errors?.cost_expenditure?.message} />
            )}
          </div>
          <div className='w-full flex justify-end items-center space-x-3'>
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
        </div>
      </form>

      <section className='w-full min-h-20 flex flex-col justify-between items-center space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:grid-rows-1 md:gap-3'>
        <div className='w-full'>
          <label className=''>Fecha inicial</label>
          <DatePicker
            locale={locale}
            className='input w-full'
            selected={initialDate}
            onChange={(date) => setInitialDate(date)}
            maxDate={limitDate}
            showTimeSelect={false}
            dateFormat='dd-MM-yyyy'
          />
        </div>
        <div className='w-full'>
          <label className=''>Fecha final</label>
          <DatePicker
            locale={locale}
            className='input w-full'
            selected={finishDate}
            onChange={(date) => setFinishDate(date)}
            maxDate={limitDate}
            showTimeSelect={false}
            dateFormat='dd-MM-yyyy'
          />
        </div>
      </section>

      <Button
        label='Buscar por fechas'
        classes='my-3'
        type='button'
        handleClick={getExpenditures}
      />

      {isLoading && <Loading />}

      {dataTableExpenditures.length === 0 ? (
        <div className='w-full mt-5 p-10 flex justify-center items-center'>
          <label>Sin resultados.</label>
        </div>
      ) : (
        <>
          <div className='w-full max-h-50vh mt-3 rounded-lg drop-shadow-2xl overflow-x-visible sm:overflow-x-hidden overflow-y-scroll bg-transparent z-10'>
            <SwipeableList>
              {dataTableExpenditures.map((expenditure) => (
                <SwipeableListItem
                  key={expenditure.id}
                  blockSwipe={expenditure.state_null}
                  swipeLeft={{
                    content: (
                      <div className='w-full h-full pr-5 bg-red-600 flex justify-end items-center'>
                        <TrashIcon color='#fff' classes='lg:w-8 lg:h-8' />
                      </div>
                    ),
                    action: () => {
                      setExpendToDelete(expenditure.id);
                      setAlertModal(true);
                    },
                  }}
                  swipeRight={{
                    content: (
                      <div className='w-full h-full pl-5 bg-blue flex justify-start items-center'>
                        <EditIcon color='#fff' classes='lg:w-8 lg:h-8' />
                      </div>
                    ),
                    action: () => handleEditMode(expenditure),
                  }}
                >
                  <ItemExpendListSwip expendItem={expenditure} />
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

export default Expenditure;
