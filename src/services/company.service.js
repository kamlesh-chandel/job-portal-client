import axiosInstance from '@/config/axiosConfig';

const DEFAULT_COMPANIES_URL = 'http://localhost:8000/api/v1/companies';

const getCompaniesUrl = () => {
  const configuredUrl = import.meta.env.VITE_COMPANIES_ENDPOINT;

  if (!configuredUrl) {
    return DEFAULT_COMPANIES_URL;
  }

  return configuredUrl.startsWith('http')
    ? configuredUrl
    : `${axiosInstance.defaults.baseURL?.replace(/\/$/, '') ?? ''}${configuredUrl}`;
};

export const getAdminCompanies = async (params = {}) => {
  const endpoint = getCompaniesUrl();

  const response = await axiosInstance.get(endpoint, {
    params,
  });

  return response?.data?.data ?? [];
};

