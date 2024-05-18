import { Outlet } from "react-router-dom";
import Header from "../../common/Header/Header";

const HomeLayout = () => {
    return (
        
        
        <>
        <Header></Header>
        <div className="max-w-6xl mx-auto">
            
            <Outlet></Outlet>
        </div>
        </>
    );
};

export default HomeLayout;