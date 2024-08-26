import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div>
      <Link to={"/dashboard/posts/new"}>New</Link>
    </div>
  );
}
