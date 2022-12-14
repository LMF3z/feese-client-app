import axios from 'axios';
import { buildSuccessResponse } from '../../utils/handleRequest';
import { headers, base_url } from '../headersAPI';

export const saveEmployeePayment = async (data) => {
  try {
    const response = await axios.post(
      `${base_url}/employees/create-new-employee-payment`,
      data,
      {
        headers: headers(),
      }
    );

    const dataResponse = buildSuccessResponse(response);

    return {
      success: dataResponse.success,
      msg: dataResponse.msg,
      data: dataResponse.data,
    };
  } catch (error) {
    return {
      success: false,
      msg: 'Error al guardar pago del empleado',
      data: null,
    };
  }
};

export const getDataEmployeePayment = async (id_employee, actualDate) =>
  await axios.get(
    `${base_url}/employees/get-data-employee-payment?id_employee=${id_employee}&actualDate=${actualDate}`,
    { headers: headers() }
  );

export const getPaymentsHistoryCompany = async ({
  id_company,
  initialDate,
  finishDate,
  flag,
  offset = 0,
}) =>
  await axios.get(
    `${base_url}/employees/get-history-payments-company?id_company=${id_company}&initialDate=${initialDate}&finishDate=${finishDate}&flag=${flag}&offset=${offset}`,
    { headers: headers() }
  );

export const getEmployeePaymentsHistory = async (id_employee, offset = 0) =>
  await axios.get(
    `${base_url}/employees/get-history-payments-employee?id_employee=${id_employee}&offset=${offset}`,
    { headers: headers() }
  );

export const getDetailsEmployeePayment = async (id) =>
  await axios.get(
    `${base_url}/employees/get-details-employee-payment?id=${id}`,
    {
      headers: headers(),
    }
  );
