import axios from '@/config/axiosConfig';

export const updateProfile = (form) => {
  return axios.put('/user/update', form);
};