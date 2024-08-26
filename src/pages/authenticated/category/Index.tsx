import { Link } from "react-router-dom";
import useGetCategory from "../../../actions/category/useGetCategory";
import Table from "./components/table/table";

export default function Index() {
  const { data } = useGetCategory();

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
