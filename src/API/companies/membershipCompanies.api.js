import axios from 'axios';
import { headers, base_url } from '../headersAPI';

export const getDataCurrentMembership = async (id_company) =>
  await axios.get(
    `${base_url}/companies/get-last-date-payment-membership?id_company=${id_company}`,
    { headers: headers() }
  );

export const saveMembershipPayment = async (data) =>
  await axios.post(`${base_url}/companies/update-membership`, data, {
    headers: headers(),
  });
