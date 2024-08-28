import Axios, { AxiosError } from "axios";

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.log("axios interceptors", error);
    // if (axios.isCancel(error)) {
    //   window.console.log('Request canceled', error.message);
    // }

    return Promise.reject(error);
  },
);

export default axios;
