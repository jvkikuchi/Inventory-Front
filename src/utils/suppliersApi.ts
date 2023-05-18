import axios from 'axios';

const url = `${process.env.API_DOMAIN}/supplier`;

const list = async () => {
  const {data} = await axios.get(url, {
    headers: {
      Accept: 'application/json',
      'content-Type': 'application/json',
    },
  });

  return data.suppliers;
};

const update = async (favorite: boolean, id: string) => {
  const {data} = await axios.patch(`${url}/${id}`, {
    favorite,
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

  data.name = data.suppliers;
  delete data.suppliers;

  return data;
};

export const suppliersApi = {
  list,
  get,
  update,
  delete: {},
  post: {},
};
