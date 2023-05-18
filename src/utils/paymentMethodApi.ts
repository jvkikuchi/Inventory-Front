import axios from 'axios';

import {PaymentMetricsType} from '../types/PaymentMethodType';

const url = `${process.env.API_DOMAIN}/payment-method`;

const statistics = async (userId: string): Promise<PaymentMetricsType> => {
  const {data} = await axios.get(`${url}/statistics`, {
    headers: {
      Accept: 'application/json',
      'content-Type': 'application/json',
    },
    params: {
      userId,
    },
  });

  return data;
};

export const paymentMethodApi = {
  statistics,
};
