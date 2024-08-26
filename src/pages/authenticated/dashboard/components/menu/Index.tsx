import MenuItem from "./MenuItem";

export default function Index() {
  return (
    <>
      <ul>
        <li>
          <MenuItem label={"Dasboard"} route={"/dashboard"} />
        </li>
        <li>
          <MenuItem label={"Categories"} route={"/dashboard/category"} />
        </li>
        <li>
          <MenuItem label={"Posts"} route={"/dashboard/posts"} />
        </li>
      </ul>
    </>
  );
}
