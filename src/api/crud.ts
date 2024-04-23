import axios from "axios";
import { VITE_API_URL } from "../utils/env";
import { getToken } from "../utils/auth";

export const get = (url: string, params?: any) => {
  return axios
    .get(`${VITE_API_URL}/${url}`, { ...getHeaders(params) })
    .then((res) => res.data);
};

export const create = (url: string, data: any) => {
  return axios
    .post(`${VITE_API_URL}/${url}`, data, getHeaders())
    .then((res) => res.data);
};

export const update = (url: string, data: any) => {
  return axios
    .put(`${VITE_API_URL}/${url}`, data, getHeaders())
    .then((res) => res.data);
};

export const remove = (url: string) => {
  return axios
    .delete(`${VITE_API_URL}/${url}`, getHeaders())
    .then((res) => res.data);
};

const getHeaders = (params?: any) => {
  return {
    params,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };
};
