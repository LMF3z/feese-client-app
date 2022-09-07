import { getClientByQuery } from '../API/clients/clients.api';
import { getEmployeeByQuery } from '../API/employees/employees.api';
import { getServicesByQueryApi } from '../API/services/services.api';
import storage from './handleLocal';

export const buildSuccessResponse = (response) => {
  return {
    success: response.data.success,
    msg: response.data.msg,
    data: response.data.data,
  };
};

export const getClientsByQuery = async (query) => {
  try {
    const data_company_or_sucursal = await storage.getDataCompany();

    const id_company = data_company_or_sucursal?.id_company
      ? data_company_or_sucursal?.id_company
      : null;

    const response = await getClientByQuery(query, id_company);
    const responseBuild = buildSuccessResponse(response);
    return responseBuild.data;
  } catch (error) {
    return [];
  }
};

export const getEmployeesByQuery = async (query) => {
  try {
    const data_company_or_sucursal = await storage.getDataCompany();

    const id_company = data_company_or_sucursal?.id_company
      ? data_company_or_sucursal?.id_company
      : null;

    const response = await getEmployeeByQuery(query, id_company);
    const responseBuild = buildSuccessResponse(response);
    return responseBuild.data;
  } catch (error) {
    return [];
  }
};

export const getServicesByQuery = async (query) => {
  try {
    const data_company_or_sucursal = await storage.getDataCompany();

    const id_company = data_company_or_sucursal?.id_company
      ? data_company_or_sucursal?.id_company
      : null;

    const response = await getServicesByQueryApi(query, id_company);
    const responseBuild = buildSuccessResponse(response);
    return responseBuild.data;
  } catch (error) {
    return [];
  }
};

export const uploadImage = async (image) => {
  const data = new FormData();
  data.append('image', image);

  const response = await fetch(
    `${process.env.REACT_APP_IMAGES_API_URL}?key=${process.env.REACT_APP_IMAGES_API_KEY}`,
    {
      method: 'POST',
      body: data,
    }
  );

  const res = await response.json();
  const objRest = { data: { link: res.data.display_url } };
  return objRest;
};
