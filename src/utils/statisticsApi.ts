import axios from 'axios';

import {FinancialStatisticsType} from '../types/StatisticsType';
import {ProductStatisticsInterface} from '../types/ProductInterface';

const url = `${process.env.API_DOMAIN}/statistics`;

const get = async (
  userId: string,
): Promise<{
  productsFinancialStatistics: FinancialStatisticsType[];
  suppliersFinancialStatistics: FinancialStatisticsType[];
}> => {
  const {data} = await axios.get(`${url}/${userId}`, {
    headers: {
      Accept: 'application/json',
      'content-Type': 'application/json',
    },
    params: {
      limit: 3,
    },
  });

  return data;
};
/* https://w99pdhthz7.execute-api.sa-east-1.amazonaws.com/dev/statistics/product/26?userId=user_2PU9RnRIVez69ZUkuJyaImYCtR0
 */ const getProductStatistics = async (
  userId: string,
  productId: number,
): Promise<ProductStatisticsInterface> => {
  const {data} = await axios.get(`${url}/product/${productId}`, {
    headers: {
      Accept: 'application/json',
      'content-Type': 'application/json',
    },
    params: {
      limit: 3,
      userId,
    },
  });

  return data;
};

export const statisticsApi = {
  get,
  getProductStatistics,
};
