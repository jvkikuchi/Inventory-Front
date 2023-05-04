import axios from 'axios';

const url = 'https://6435f4b43e4d2b4a12c8253f.mockapi.io/category';

const list = async () => {
  const {data} = await axios.get(url, {
    headers: {
      Accept: 'application/json',
      'content-Type': 'application/json',
    },
  });

  return data.map(s => {
    s.name = s.suppliers;
    delete s.suppliers;
    return s;
  });
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

const update = async (favorite: boolean, id: string) => {
  const {data} = await axios.patch(`${url}/${id}`, {
    favorite,
  });

  return data;
};

export const suppliersApi = {
  list,
  get,
  update,
  delete: {},
  post: {},
};
