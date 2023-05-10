import axios from 'axios';
import type {ProductInterface} from '../types/ProductInterface';

const url = 'http://192.168.100.40:3000/dev/product';

const list = async (
  userId: string,
  page: number = 1,
): Promise<{products: ProductInterface[]; count: number; totalPages: 1}> => {
  const {data} = await axios.get(url, {
    headers: {
      Accept: 'application/json',
      'content-Type': 'application/json',
    },
    params: {
      userId,
      page,
    },
  });

  return data;
};

const get = async (id?: string) => {
  const {data} = await axios.get(`${url}/${id}`, {
    headers: {
      Accept: 'application/json',
      'content-Type': 'application/json',
    },
  });

  return data;
};

const update = async (product: {
  id: string;
  name?: string;
  image?: string;
  stockQuantity: string;
  unitPrice: string;
  categoryId?: string;
  description?: string;
  supplierId?: string;
}) => {
  const {data} = await axios.put(`${url}/${product.id}`, {
    ...product,
  });

  return data;
};

const create = async (product: {
  userId: string;
  name: string;
  image?: string;
  stockQuantity: number;
  unitPrice: number;
  categoryId: number;
  description?: string;
  supplierId: number;
}) => {
  const {data} = await axios.post(`${url}`, {
    ...product,
  });

  return data;
};

export const productsApi = {
  list,
  get,
  create,
  update,
  delete: {},
  post: {},
};
