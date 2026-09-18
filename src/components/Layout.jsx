import { Outlet } from "react-router";
import TopBar from "./TopBar";

function Layout() {
  return (
    <>
      <TopBar />

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
