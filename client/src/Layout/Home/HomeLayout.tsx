import { Outlet } from "react-router-dom";

import Footer from "../../common/Footer/Footer";
import Header from "../../common/Header/Header";

const HomeLayout = () => {
  return (
    <>
      <Header></Header>
      <div className="w-[90%] lg:max-w-[1250px] mx-auto">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  );
};

export default HomeLayout;
