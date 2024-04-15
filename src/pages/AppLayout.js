import { Outlet } from "react-router-dom";

function AppLayout({ children }) {
  return (
    <>
      <Outlet />
    </>
  );
}

export default AppLayout;
