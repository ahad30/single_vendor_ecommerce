import { Link, useLocation } from "react-router-dom";
import { CustomerRoutes } from "../../Routes/Customer.Routes";
import { sidebarGenerator } from "../../utils/sidebarGenerator";
import { useState } from "react";


const CustomerDashboardSidebar = () => {
    const sidebarData = sidebarGenerator(CustomerRoutes)
    // console.log(sidebarData)
    const [open, setOpen] = useState("");
    const { pathname } = useLocation();
    console.log(pathname);
    return (
        <div className="bg-white w-[320px] rounded-md py-3">
            {/* thi div contains image and user name */}
            <div>
                <div className="mb-5  flex flex-col justify-center items-center">
                    <img className="w-40 h-40" src="https://i.ibb.co/J3ChPyM/istockphoto-1451587807-612x612.jpg" alt="" />
                    <h1 className="text-[#265edd] font-medium text-[20px]">Sabiha Wasema</h1>
                </div>
                {/* sidebar data */}
                <div>
                    {sidebarData.map((item) => {

                        return (
                            <Link to={item.key} key={item.key} className="">
                                <div className={`flex items-center hover:border-x-4 border-blue-500 duration-100 gap-x-3 px-7 py-1 text-sm hover:bg-gray-200 ${pathname === item.key ? " bg-gray-200 border-x-4 border-blue-500" : ""}`}>
                                    <span className="py-2">{item?.icon}</span>
                                    <span className="py-2">{item?.label}</span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div >
    );
};

export default CustomerDashboardSidebar;