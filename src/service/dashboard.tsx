import http from '../http';

const getDashboardData = async () => {
  const response = await http.get('/api/v1/dashboard');
  return response.data;
};

export const dashboardService = {
  getDashboardData,
};

