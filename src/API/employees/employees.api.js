import axios from 'axios';
import { headers, base_url } from '../headersAPI';

const registerEmployee = async (data) =>
  await axios.post(`${base_url}/employees/add-new-employee`, data, {
    headers: headers(),
  });

const getEmployees = async ({
  id_company = null,
  id_branches = null,
  offset,
}) =>
  await axios.get(
    `${base_url}/employees/get-employees-list?id_company=${id_company}&id_branches=${id_branches}&offset=${offset}`,
    { headers: headers() }
  );

export const getEmployeeByQuery = async (query, id_company) =>
  await axios.get(
    `${base_url}/employees/get-all-matches-employees?query=${query}&id_company=${id_company}`,
    { headers: headers() }
  );

const updateEmployee = async (data) =>
  await axios.put(`${base_url}/employees/update-employee`, data, {
    headers: headers(),
  });

const deleteEmployee = async ({ id_employee, id_company, id_branches }) =>
  await axios.delete(
    `${base_url}/employees/delete-employee?id_employee=${id_employee}&id_company=${id_company}&id_branches=${id_branches}`,
    { headers: headers() }
  );

export const getAllUsersCompany = async (id_company, offset = 0) =>
  await axios.get(
    `${base_url}/employees/get-all-users-company?id_company=${id_company}&offset=${offset}`,
    {
      headers: headers(),
    }
  );

export const registerUserCompany = async (data) =>
  await axios.post(`${base_url}/employees/create-new-user-company`, data, {
    headers: headers(),
  });

export const deleteUserCompany = async (id) =>
  await axios.delete(`${base_url}/employees/delete-user-company?id=${id}`, {
    headers: headers(),
  });

const employeesApi = {
  registerEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
};

export default employeesApi;
