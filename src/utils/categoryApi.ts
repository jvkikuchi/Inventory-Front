import axios from 'axios';

const url = `${process.env.API_DOMAIN}/category`;

const list = async (userId: string) => {
  const {data} = await axios.get(`${url}/${userId}`, {
    headers: {
      Accept: 'application/json',
      'content-Type': 'application/json',
    },
  });

  return data.categories;
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
