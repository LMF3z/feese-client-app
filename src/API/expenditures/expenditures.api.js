import axios from 'axios';
import { headers, base_url } from '../headersAPI';

export const createNewExpenditure = async (data) =>
  await axios.post(`${base_url}/expenditures/create-expenditure`, data, {
    headers: headers(),
  });

export const getAllExpenditures = async ({
  id_company = null,
  id_branches = null,
  offset = 0,
  initialDate,
  finishDate,
}) =>
  await axios.get(
    `${base_url}/expenditures/get-all-expenditures?id_company=${id_company}&id_branches=${id_branches}&offset=${offset}&initialDate=${initialDate}&finishDate=${finishDate}`,
    {
      headers: headers(),
    }
  );

export const updateExpenditureById = async (data) =>
  await axios.put(`${base_url}/expenditures/update-expenditure`, data, {
    headers: headers(),
  });

export const deleteExpenditureById = async (id) =>
  await axios.delete(`${base_url}/expenditures/delete-expenditure?id=${id}`, {
    headers: headers(),
  });
