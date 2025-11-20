import axios from '@/config/axiosConfig';

export const recruiterCompanies = (page, limit) => {
  const params = {page, limit};
  return axios.get('/companies', {params});
};

export const createCompany = form => {
  return axios.post('/companies', form);
};

