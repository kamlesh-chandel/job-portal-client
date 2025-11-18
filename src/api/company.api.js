import axios from '@/config/axiosConfig';

export const recruiterCompanies = () => {
  return axios.get('/companies');
};

export const createCompany = form => {
  return axios.post('/companies', form);
};

