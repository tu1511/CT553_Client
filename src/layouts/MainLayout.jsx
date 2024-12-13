import Footer from "@components/Footer";
import Header from "@components/Header";
import PropTypes from "prop-types";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
