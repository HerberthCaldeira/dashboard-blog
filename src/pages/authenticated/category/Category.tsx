import { Link } from "react-router-dom";

export default function Category() {
  return (
    <div>
      <div>Category </div>
      <div>
        <Link to={"/dashboard/category/new"}>New</Link>
      </div>
    </div>
  );
}
