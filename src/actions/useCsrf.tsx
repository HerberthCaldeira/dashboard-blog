import axios from "../lib/axios/axios";

const useCsrf = () => axios.get("/sanctum/csrf-cookie");

export default useCsrf;
