import Footer from "@components/common/Footer";
import Header from "@components/common/Header";
import { FloatButton } from "antd";
import { ArrowBigUp } from "lucide-react";
import PropTypes from "prop-types";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <FloatButton.BackTop
        visibilityHeight={400}
        duration={500}
        target={() => window}
        icon={<ArrowBigUp size={20} className="text-white " />}
        shape="square"
        className="custom-backtop"
        style={{
          right: 100,
          bottom: 50,
          zIndex: 1000,
        }}
      />
      <Footer />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
