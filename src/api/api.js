import axios from 'axios';

const BASE_URL = 'https://65170324582f58d62d34b2ac.mockapi.io';

const api = axios.create({
  baseURL: BASE_URL,
});

const resourceApi = resource => {
  return {
    getAll: () => api.get(`/${resource}`),
    get: id => api.get(`/${resource}/${id}`),
    create: data => api.post(`${resource}`, data),
    delete: id => api.delete(`${resource}/${id}`),
  };
};

const contactApi = resourceApi('contacts');

export { contactApi };
