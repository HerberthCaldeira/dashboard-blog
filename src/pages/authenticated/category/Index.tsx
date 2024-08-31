import { Link } from "react-router-dom";
import useGetCategory from "../../../actions/category/useGetCategory";
import Table from "./components/table/table";

export default function Index() {
  const { data, isError, error } = useGetCategory();

  if (isError) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div>
      <div>Category </div>
      <div>
        <Link to={"/dashboard/category/new"}>New</Link>
      </div>

      <Table data={data} />
    </div>
  );
}
