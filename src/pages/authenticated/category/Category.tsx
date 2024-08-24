import { Link } from "react-router-dom";
import Table from "./table/table";
import useGetCategory from "../../../actions/category/useGetCategory";

export default function Category() {
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
