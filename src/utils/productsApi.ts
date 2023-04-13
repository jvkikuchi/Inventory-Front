import axios from 'axios';

const url = 'https://6435f4b43e4d2b4a12c8253f.mockapi.io/product';

const list = async (filters: Record<string, boolean>) => {
  const filtersToUse = Object.keys(filters).reduce((acc, cr) => {
    const key = cr;

    if (filters[key]) {
      acc.push(key);
    }

    return acc;
  }, [] as string[]);

  const {data} = await axios.get(url, {
    headers: {
      Accept: 'application/json',
      'content-Type': 'application/json',
    },
    params: {
      tag: filtersToUse,
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

const update = async (favorite: boolean, id: string) => {
  const {data} = await axios.patch(`${url}/${id}`, {
    favorite,
  });

  return data;
};

export const productsApi = {
  list,
  get,
  update,
  delete: {},
  post: {},
};