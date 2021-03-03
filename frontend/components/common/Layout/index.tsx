import Nav from "../Navbar/Navbar";

const Layout = ({ children, categories }) => (
  <>
    <Nav categories={categories} />
    {children}
  </>
);

export default Layout;
