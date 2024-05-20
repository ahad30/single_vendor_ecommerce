import { Outlet } from "react-router-dom";
import Header from "../../common/Header/Header";
import Footer from "../../common/Footer/Footer";

const HomeLayout = () => {
    return (
        
        
        <>
        <Header></Header>
        <div className="max-w-6xl mx-auto">
        <Outlet></Outlet>
        </div>
        <Footer></Footer>
        </>
    );
};

export default HomeLayout;