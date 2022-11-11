import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import employeesApi from '../../../../API/employees/employees.api';
import Loading from '../../../../assets/Icons/Loading';
import AutoSuggest from '../../../../components/AutoSuggest/AutoSuggest';
import ItemSuggest from '../../../../components/AutoSuggest/components/ItemSuggest';
import Button from '../../../../components/Button';
import ButtonForPagination from '../../../../components/ButtonForPagination';
import usePaginate from '../../../../components/hooks/paginate/usePaginate';
import ItemEmployeeAsig from './ItemEmployeeAsig';
import { ContextApp } from '../../../../Store/ContextApp';
import types from '../../../../Store/contextTypes';
import storage from '../../../../utils/handleLocal';
import {
  buildSuccessResponse,
  getEmployeesByQuery,
} from '../../../../utils/handleRequest';

const ModalAssignEmployee = ({ closeModal }) => {
  const { dispatch } = useContext(ContextApp);

  const [isLoading, setIsLoading] = useState(false);
  const [dataTableEmployee, setDataTableEmployee] = useState([]);

  const { SetNumPages, pageCount, handleChangePage, offset } = usePaginate();

  useEffect(() => {
    getEmployees();
  }, []);

  useEffect(() => {
    getEmployees();
  }, [offset]);

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

  const getEmployeesQuery = async (query) => {
    const response = await getEmployeesByQuery(query);
    return response;
  };

  const handleRenderEmployeesFetchFunction = (item) => ({
    id: item['id'],
    id_company: item['id_company'],
    id_branches: item['id_branches'],
    name_employee: item['name_employee'],
    last_name_employee: item['last_name_employee'],
    identification_employee: item['identification_employee'],
    name: item['name_employee'],
    last_name: item['last_name_employee'],
    isActive: item['isActive'],
    payment_amount: item['payment_amount'],
    phone_employee: item['phone_employee'],
    createdAt: item['createdAt'],
    updatedAt: item['updatedAt'],
  });

  const handleSelectEmployee = async (employee) => {
    dispatch({ type: types.ADD_EMPLOYEE_ORDER, payload: employee });
    toast.success('Empleado seleccionado con éxito.');
  };

  const renderItemEmployee = (item) => {
    return (
      <ItemSuggest>
        <span className='capitalize'>{item.name}</span>
      </ItemSuggest>
    );
  };

  return (
    <>
      <div className='py-2 text-base md:text-lg'>
        <div className='w-full h-10 mb-3'>
          <AutoSuggest
            inputProps={{ placeholder: 'Buscar empleados' }}
            onFetchFunction={getEmployeesQuery}
            renderFetchFunction={handleRenderEmployeesFetchFunction}
            onCallbackFunction={handleSelectEmployee}
            renderItem={renderItemEmployee}
          />
        </div>

        {isLoading && <Loading />}

        <section className='w-full max-h-[50vh] grid grid-cols-1 gap-3 overflow-x-hidden overflow-y-auto'>
          {dataTableEmployee.length > 0 &&
            dataTableEmployee.map((employee) => (
              <ItemEmployeeAsig key={employee.id} employee={employee} />
            ))}
        </section>
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
      </div>
      <Button
        label='Facturar'
        type='button'
        classes='my-3'
        handleClick={closeModal}
      />
    </>
  );
};

export default ModalAssignEmployee;
