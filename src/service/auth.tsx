import http from "../http";
import type { ILoginReq } from "../interface/user";

const postLogin = async (params: ILoginReq) => {
  const response = await http.post('/api/v1/auth/login', params);
  return response.data;
}

export const authService = {
  postLogin,
}