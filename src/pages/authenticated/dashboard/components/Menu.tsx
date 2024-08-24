import MenuItem from "./MenuItem";

export default function Menu() {
  return (
    <>
      <ul>
        <li>
          <MenuItem label={"Dasboard"} route={"/dashboard"} />
        </li>
        <li>
          <MenuItem label={"Category"} route={"/dashboard/category"} />
        </li>
      </ul>
    </>
  );
}
