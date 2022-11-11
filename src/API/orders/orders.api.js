import axios from 'axios';
import { buildSuccessResponse } from '../../utils/handleRequest';
import { headers, base_url } from '../headersAPI';

const createOrder = async (data) =>
  await axios.post(`${base_url}/orders/create-order`, data, {
    headers: headers(),
  });

const getOrderByNumControl = async (num_control) =>
  await axios.get(
    `${base_url}/orders/get-order-data-by-num-control?num_control=${num_control}`,
    { headers: headers() }
  );

export const getOrdersByRangeDates = async (
  id_company,
  initialDate,
  finishDate,
  offset = 0
) =>
  await axios.get(
    `${base_url}/orders/get-orders-list-by-range-date?id_company=${id_company}&initialDate=${initialDate}&finishDate=${finishDate}&offset=${offset}`,
    { headers: headers() }
  );

export const annularOrder = async ({ id_company, id_order }) => {
  try {
    const response = await axios.put(
      `${base_url}/orders/annular-order-by-id`,
      { id_company, id_order },
      { headers: headers() }
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
      msg: 'Error al intentar anular orden.',
      data: null,
    };
  }
};

export const getEnableCash = async (id_company, date) =>
  await axios.get(
    `${base_url}/orders/get-enable-cash?id_company=${id_company}&date=${date}`,
    { headers: headers() }
  );

const orderApi = { createOrder, getOrderByNumControl };

export default orderApi;
