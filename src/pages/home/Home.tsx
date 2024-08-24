import { Link } from "react-router-dom";
import { useAuth } from "../../actions/auth/useAuth";

export default function Home() {
  const { user } = useAuth({
    middleware: "guest",
  });

  return (
    <>
      <div>Home</div>
      <Link to={"/login"}>Login</Link>
      <div>todo:: get all post and filters</div>
    </>
  );
}
