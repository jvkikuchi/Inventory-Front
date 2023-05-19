import axios from 'axios';
import type {ProductInterface} from '../types/ProductInterface';
import {CategoryType} from '../types/CategorieType';
import {SupplierType} from '../types/SuppplierType';

const url = `${process.env.API_DOMAIN}/product`;

const list = async (
  userId: string,
  page: number = 1,
): Promise<{
  products: ProductInterface[];
  count: number;
  totalPages: number;
}> => {
  const {data} = await axios.get(url, {
    headers: {
      Accept: 'application/json',
      'content-Type': 'application/json',
    },
    params: {
      userId,
      page,
      orderBy: 'desc',
    },
  });

  return data;
};

type GetProductOutput = ProductInterface & {
  suppliers: SupplierType[];
  categories: CategoryType[];
};

const get = async (id?: number): Promise<GetProductOutput> => {
  const {data} = await axios.get(`${url}/${id}`, {
    headers: {
      Accept: 'application/json',
      'content-Type': 'application/json',
    },
  });

  return data;
};

const update = async (product: {
  id: number;
  name?: string;
  image?: string;
  stockQuantity: number;
  unitPrice: number;
  categoryId?: string;
  description?: string;
  supplierId?: string;
  userId: string;
}) => {
  const {data} = await axios.put(`${url}`, {
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
