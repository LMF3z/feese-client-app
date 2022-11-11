import axios from 'axios';
import { buildSuccessResponse } from '../../utils/handleRequest';
import { headers, base_url } from '../headersAPI';

const registerService = async (data) =>
  await axios.post(`${base_url}/services/add-new-service`, data, {
    headers: headers(),
  });

const getServices = async ({ id_company = null, id_branches = null, offset }) =>
  await axios.get(
    `${base_url}/services/get-services-list?id_company=${id_company}&id_branches=${id_branches}&offset=${offset}`,
    { headers: headers() }
  );

export const getServicesByQueryApi = async (query, id_company) =>
  await axios.get(
    `${base_url}/services/get-services-query?query=${query}&id_company=${id_company}`,
    { headers: headers() }
  );

export const updateService = async (data) => {
  try {
    const response = await axios.put(
      `${base_url}/services/update-service`,
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
      msg: 'Error al actualizar servicio',
      data: null,
    };
  }
};

const deleteService = async ({ id_service, id_company, id_branches }) =>
  await axios.delete(
    `${base_url}/services/delete-service?id_service=${id_service}&id_company=${id_company}&id_branches=${id_branches}`,
    { headers: headers() }
  );

const servicesApi = {
  registerService,
  getServices,
  updateService,
  deleteService,
};

export default servicesApi;
