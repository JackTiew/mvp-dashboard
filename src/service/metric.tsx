import http from "../http";

const getMetrics = async () => {
  const response = await http.get('/api/v1/metrics');
  return response.data;
}

export const metricService = {
  getMetrics,
}