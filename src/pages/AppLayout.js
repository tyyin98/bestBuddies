import Nav from "../Components/Nav";

function AppLayout({ children }) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}

export default AppLayout;
