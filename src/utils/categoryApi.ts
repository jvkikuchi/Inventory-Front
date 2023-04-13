import axios from 'axios';

const url = 'https://6435f4b43e4d2b4a12c8253f.mockapi.io/category';

const list = async () => {
  const {data} = await axios.get(url, {
    headers: {
      Accept: 'application/json',
      'content-Type': 'application/json',
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

export const categoryApi = {
  list,
  get,
  update,
  delete: {},
  post: {},
};
