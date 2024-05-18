import { Outlet } from "react-router-dom";

const HomeLayout = () => {
    return (
        
        
        
        <div className="max-w-6xl mx-auto">
            <Outlet></Outlet>
        </div>
    );
};

export default HomeLayout;