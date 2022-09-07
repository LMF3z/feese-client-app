import axios from 'axios';
import { headers, base_url } from '../headersAPI';

export const createClient = async (data) =>
  await axios.post(`${base_url}/clients/create-client`, data, {
    headers: headers(),
  });

export const getClientByQuery = async (query, id_company) =>
  await axios.get(
    `${base_url}/clients/get-all-matches-clients?query=${query}&id_company=${id_company}`,
    { headers: headers() }
  );
