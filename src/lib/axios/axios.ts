import Axios, { AxiosError, isAxiosError } from "axios";

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

/**
 * Intercept the response and handle redirects
 */
axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.log("axios::interceptors::error", error);
    if (
      isAxiosError(error) &&
      [419, 401].includes(error?.response?.status || 0)
    ) {
      window.console.log("Request canceled ::", error.message);
      window.history.pushState({}, "", "/login");
      // communicate to Routes that URL has changed
      const navEvent = new PopStateEvent("popstate");
      window.dispatchEvent(navEvent);
    }

    /**
     * Error 422 - validation
     */

    if (
      isAxiosError(error) &&
      [422].includes(error?.response?.status || 0)
    ) {
      window.console.log("Request canceled ::", error.message);
      window.history.pushState({}, "", "/login");
      // communicate to Routes that URL has changed
      const navEvent = new PopStateEvent("popstate");
      window.dispatchEvent(navEvent);
    }





    return Promise.reject(error);
  }
);

export default axios;
