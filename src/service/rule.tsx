import http from "../http";
import type { ICreateRuleReq, IUpdateRuleReq } from '../interface/rule';

const getRuleList = async () => {
  const response = await http.get('/api/v1/rules');
  return response.data;
}

const createRule = async (params: ICreateRuleReq) => {
  const response = await http.post('/api/v1/rules', params);
  return response.data;
}

const updateRule = async (params: IUpdateRuleReq) => {
  const response = await http.put(`/api/v1/rules/${params.id}`, params);
  return response.data;
}

const deleteRule = async (id: string) => {
  await http.delete(`/api/v1/rules/${id}`);
}

export const ruleService = {
  getRuleList,
  createRule,
  updateRule,
  deleteRule,
}