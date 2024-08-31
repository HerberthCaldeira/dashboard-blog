import { Link } from "react-router-dom";
import useGetPost from "../../../actions/post/useGetPost";
import Table from "../category/components/table/table";

export default function Index() {
  const { data, error, isError, isPending } = useGetPost();

  if (isError) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div>
      <Link to={"/dashboard/posts/new"}>New</Link>

      <Table data={data} />
    </div>
  );
}
