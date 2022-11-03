import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import {
  SwipeableList,
  SwipeableListItem,
} from '@sandstreamdev/react-swipeable-list';
import ReactPaginate from 'react-paginate';

import ShowErrorForm from '../../components/ShowErrorForm';
import Button from '../../components/Button';
import EditIcon from '../../assets/Icons/EditIcon';
import TrashIcon from '../../assets/Icons/TrashIcon';
import FormEmployeeSchema from '../../validations/form.employee';
import employeesApi from '../../API/employees/employees.api';
import Loading from '../../assets/Icons/Loading';
import ItemEmployeeListSwip from '../../components/ItemEmployeeListSwip';
import storage from '../../utils/handleLocal';
import usePaginate from '../../components/hooks/paginate/usePaginate';
import ContainerModalContext from '../../components/ContainerModalContext';
import ModalAuthorization from '../../components/ModalAuthorization';
import useAuth from '../../components/hooks/auth/useAuth';
import ButtonForPagination from '../../components/ButtonForPagination';
import InputWithLabel from '../../components/InputWithLabel';
import SelectWithLabel from '../../components/SelectWithLabel';

const Employees = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormEmployeeSchema.FormEmployeeSchema),
  });

  const { buildSuccessResponse } = useAuth();

  const { SetNumPages, pageCount, handleChangePage, offset } = usePaginate();

  const [dataTableEmployee, setDataTableEmployee] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  useEffect(() => {
    getEmployees();
  }, []);

  useEffect(() => {
    getEmployees();
  }, [offset]);

  const registerEmployee = async (data) => {
    if (isEditMode) {
      updateEmployee(data);
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

      const response = await employeesApi.registerEmployee(data);

      const registerData = buildSuccessResponse(response);

      registerData.success
        ? toast.success(registerData.msg, { duration: 5000 })
        : toast.error(registerData.msg, { duration: 5000 });

      registerData.success && reset();

      registerData.success && (await getEmployees());

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error('Error al registrar empleado.', { duration: 5000 });
    }
  };

  const getEmployees = async () => {
    try {
      setIsLoading(true);

      const data_company_or_sucursal = await storage.getDataCompany();

      const id_company = data_company_or_sucursal?.id_company
        ? data_company_or_sucursal?.id_company
        : null;
      const id_branches = data_company_or_sucursal?.id_branches
        ? data_company_or_sucursal?.id_branches
        : null;

      const response = await employeesApi.getEmployees({
        id_company,
        id_branches,
        offset: offset,
      });

      const employeesList = buildSuccessResponse(response);

      employeesList.success === false &&
        toast.error(employeesList.msg, { duration: 5000 });

      employeesList.success && setDataTableEmployee(employeesList.data.rows);
      employeesList.success && SetNumPages(employeesList.data.count);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error('Error al obtener lista de empleados.', { duration: 5000 });
    }
  };

  const handleEditMode = (employee) => {
    setIsEditMode(true);

    setValue('id', employee.id);
    setValue('name_employee', employee.name_employee);
    setValue('last_name_employee', employee.last_name_employee);
    setValue('identification_employee', employee.identification_employee);
    setValue('phone_employee', employee.phone_employee);
    setValue('sucursal_employee', 'none');
    setValue('payment_type', employee.payment_type);
  };

  const updateEmployee = async (data) => {
    try {
      setIsLoading(true);

      const response = await employeesApi.updateEmployee(data);

      const updatedData = buildSuccessResponse(response);

      updatedData.success
        ? toast.success(updatedData.msg, { duration: 5000 })
        : toast.error(response.msg, { duration: 5000 });

      updatedData.success && reset();

      updatedData.success && (await getEmployees());

      setIsLoading(false);
      setIsEditMode(false);
    } catch (error) {
      setIsLoading(false);
      toast.error('Error al actualizar empleado.', { duration: 5000 });
    }
  };

  const deleteEmployee = async () => {
    try {
      setIsLoading(true);

      const response = await employeesApi.deleteEmployee({
        id_employee: employeeToDelete.id,
        id_company: employeeToDelete.id_company,
        id_branches: employeeToDelete.id_branches,
      });

      const employeesDeleted = buildSuccessResponse(response);

      // employeesDeleted.success
      //   ? toast.success(employeesDeleted.msg, { duration: 5000 })
      //   : toast.error(employeesDeleted.msg, { duration: 5000 });

      employeesDeleted.success && setAlertModal(false);

      await getEmployees();
      setIsLoading(false);

      if (!employeesDeleted.success) {
        return toast.error(employeesDeleted.msg, { duration: 5000 });
      }
    } catch (error) {
      setIsLoading(false);
      toast.error('Error al obtener lista de empleados.', { duration: 5000 });
    }
  };

  if (alertModal) {
    return (
      <ContainerModalContext
        classes='md:w-1/2 lg:w-1/3 bg-secondaryColor'
        onCloseModal={() => setAlertModal(false)}
      >
        <ModalAuthorization
          handleAccept={deleteEmployee}
          handleCancel={() => setAlertModal(false)}
          message='¿Seguro que desea eliminar este empleado?'
        />
      </ContainerModalContext>
    );
  }

  return (
    <div className='container_section'>
      <h1 className='text-2xl'>Empleados</h1>
      <form
        onSubmit={handleSubmit(registerEmployee)}
        className='form_container min-h-10vh pt-3 z-20 mb-8'
      >
        {isEditMode && <input type='hidden' {...register('id')} />}

        <div className='container_square_form grid grid-cols-1 grid-flow-row md:grid-cols-2 md:grid-rows-4 gap-3'>
          <div className='w-full'>
            <InputWithLabel
              label='Nombre'
              type='text'
              name='name_employee'
              register={register}
            />
            {errors?.name_employee?.message && (
              <ShowErrorForm label={errors?.name_employee?.message} />
            )}
          </div>

          <div className='w-full'>
            <InputWithLabel
              label='Apellido'
              type='text'
              name='last_name_employee'
              register={register}
            />
            {errors?.last_name_employee?.message && (
              <ShowErrorForm label={errors?.last_name_employee?.message} />
            )}
          </div>

          <div className='w-full'>
            <InputWithLabel
              label='Identificación'
              type='text'
              name='identification_employee'
              register={register}
            />
            {errors?.identification_employee?.message && (
              <ShowErrorForm label={errors?.identification_employee?.message} />
            )}
          </div>

          <div className='w-full'>
            <InputWithLabel
              label='Teléfono'
              type='text'
              name='phone_employee'
              register={register}
            />
            {errors?.phone_employee?.message && (
              <ShowErrorForm label={errors?.phone_employee?.message} />
            )}
          </div>

          <div className='w-full'>
            <SelectWithLabel
              label='Sucursal'
              name='sucursal_employee'
              register={register}
              disabled
            >
              <option
                select='true'
                value='none'
                className='text-text_base_color md:text-lg'
              >
                Sin sucursal
              </option>
            </SelectWithLabel>
          </div>

          <div className='w-full'>
            <SelectWithLabel
              label='Tipo de pago'
              name='payment_type'
              register={register}
            >
              <option
                select='true'
                value='fixed_payment'
                className='text-text_base_color'
              >
                Pago fijo
              </option>
              <option value='percent_payment' className='text-text_base_color'>
                Pago por porcentaje
              </option>
            </SelectWithLabel>
            {errors?.payment_type?.message && (
              <ShowErrorForm label={errors?.payment_type?.message} />
            )}
          </div>

          <div className='w-full md:col-span-2'>
            <InputWithLabel
              label='Pago'
              type='number'
              name='payment_amount'
              register={register}
            />
            {errors?.payment_amount?.message && (
              <ShowErrorForm label={errors?.payment_amount?.message} />
            )}
          </div>

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
        </div>
      </form>

      {isLoading && <Loading />}

      {dataTableEmployee?.length === 0 ? (
        <div className='w-full mt-5 p-10 flex justify-center items-center'>
          <label>Sin resultados.</label>
        </div>
      ) : (
        <>
          <div className='w-full max-h-50vh mt-10 drop-shadow-2xl overflow-x-visible sm:overflow-x-hidden overflow-y-scroll z-10'>
            <SwipeableList>
              {dataTableEmployee.map((employeeItem) => (
                <SwipeableListItem
                  key={employeeItem.id}
                  swipeLeft={{
                    content: (
                      <div className='w-full h-full pr-5 bg-red-600 flex justify-end items-center'>
                        <TrashIcon color='#fff' classes='lg:w-8 lg:h-8' />
                      </div>
                    ),
                    action: () => {
                      setAlertModal(true);
                      setEmployeeToDelete(employeeItem);
                    },
                  }}
                  swipeRight={{
                    content: (
                      <div className='w-full h-full pl-5 bg-blue flex justify-start items-center'>
                        <EditIcon color='#fff' classes='lg:w-8 lg:h-8' />
                      </div>
                    ),
                    action: () => handleEditMode(employeeItem),
                  }}
                >
                  <ItemEmployeeListSwip employeeItem={employeeItem} />
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

export default Employees;
