import Nav from "../Navbar";

const Layout = ({ children, categories, seo }) => (
  <>
    <Nav categories={categories} />
    {children}
  </>
);

export default Layout;
