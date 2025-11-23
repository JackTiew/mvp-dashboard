import http from "../http";
import type { IGetCaseListReq, ICaseActionReq } from "../interface/case";

const getCaseList = async (params?: IGetCaseListReq) => {
  const response = await http.get('/api/v1/cases', {
    params: params,
  });
  return response.data;
}

const performCaseAction = async (params: ICaseActionReq) => {
  const response = await http.post(`/api/v1/cases/${params.id}/action`, params);
  return response.data;
}

export const caseService = {
  getCaseList,
  performCaseAction,
}