import { useQuery } from "@tanstack/react-query";
import axios from "../../lib/axios/axios";

const getRequest = async () => {
  try {
    const response = await axios.get("/api/category");
    return response.data;
  } catch (err) {
    console.log("Get all categories error::", err);
  }
};

const useGetCategory = () => {
  const { data, error, isError, isPending } = useQuery({
    queryKey: ["category"],
    queryFn: getRequest,
  });

  return {
    data,
    error,
    isError,
    isPending,
  };
};

export default useGetCategory;
