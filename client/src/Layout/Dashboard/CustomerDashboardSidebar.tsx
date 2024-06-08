import { Link } from "react-router-dom";
import { CustomerRoutes } from "../../Routes/Customer.Routes";
import { sidebarGenerator } from "../../utils/sidebarGenerator";
import { useState } from "react";


const CustomerDashboardSidebar = () => {
    const sidebarData = sidebarGenerator(CustomerRoutes)
    console.log(sidebarData)
    const [open, setOpen] = useState("");

    return (
        <div className="bg-white w-[320px] px-7 rounded-md py-2">
            {/* thi div contains image and user name */}
            <div>
                <div className="mb-5  flex flex-col justify-center items-center">
                    <img className="w-40 h-40" src="https://i.ibb.co/J3ChPyM/istockphoto-1451587807-612x612.jpg" alt="" />
                    <h1>Sabiha Wasema</h1>
                </div>
                {/* sidebar data */}
                <div>
                    {
                        sidebarData.map((item) => {
                            return <Link to={item.key}>
                                <div className="flex items-center gap-x-3 p-2 text-sm">
                                    <span>{item?.icon}</span>
                                    <span>{item?.label}</span>
                                </div>
                            </Link>
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboardSidebar;