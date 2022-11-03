import axios from 'axios';
import { headers, base_url } from '../headersAPI';
import { buildSuccessResponse } from '../../utils/handleRequest';

const registerCompany = async (data) => {
  try {
    const response = await axios.post(
      `${base_url}/auth/register-company`,
      data
    );

    const result = buildSuccessResponse(response);

    return result;
  } catch (error) {
    return {
      success: false,
      msg: 'Error al registrar empresa.',
      data: {},
    };
  }
};

const login = async (data) => await axios.post(`${base_url}/auth/login`, data);

export const getDataCompanyByID = async (id) =>
  await axios.get(`${base_url}/companies/get-company-data-by-id?id=${id}`, {
    headers: headers(),
  });

export const updateDataCompanyById = async (data) =>
  await axios.put(`${base_url}/companies/update-data-company`, data, {
    headers: headers(),
  });

const companiesApi = { registerCompany, login };

export default companiesApi;
