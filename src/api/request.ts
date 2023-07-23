import axios, { AxiosRequestConfig } from "axios";

export const api = () => {
  return {
    get: async (url: string, options?: AxiosRequestConfig) => {
      return await axios.get(url, options);
    },
    post: async (url: string, data?: any, options?: AxiosRequestConfig) => {
      return await axios.post(url, data, options);
    },
    delete: async (url: string, options?: AxiosRequestConfig) => {
      return await axios.delete(url, options);
    },
  };
};
