import axios, { AxiosRequestConfig } from "axios";

export const api = () => {
  return {
    get: async (url: string, options?: AxiosRequestConfig) => {
      try {
        return await axios.get(url, options);
      } catch (error: any) {
        return error.response;
      }
    },
    post: async (url: string, data?: any, options?: AxiosRequestConfig) => {
      try {
        return await axios.post(url, data, options);
      } catch (error: any) {
        return error.response;
      }
    },
    put: async (url: string, data?: any, options?: AxiosRequestConfig) => {
      try {
        return await axios.put(url, data, options);
      } catch (error: any) {
        return error.response;
      }
    },
    delete: async (url: string, options?: AxiosRequestConfig) => {
      try {
        return await axios.delete(url, options);
      } catch (error: any) {
        return error.response;
      }
    },
  };
};
