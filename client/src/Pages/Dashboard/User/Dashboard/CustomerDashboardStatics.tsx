import { CiBoxList } from "react-icons/ci";
import { FaClipboardList } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { LiaListAltSolid } from "react-icons/lia";
const CustomerDashboardStatics = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6  xl:gap-x-6">
        <div className="w-full md:w-72 h-52 bg-white flex flex-col justify-center items-center rounded-lg shadow-lg">
          <div className="w-12 h-12 bg-[#265eda] rounded-lg flex justify-center items-center text-white">
            <CiBoxList className="w-8 h-8 " />
          </div>
          <h1 className="text-3xl mt-2 font-semibold">0</h1>
          <p className="text-base">All orders</p>
        </div>
        <div className="w-full md:w-72 h-52 bg-white flex flex-col justify-center items-center rounded-lg shadow-lg"> <div className="w-12 h-10 bg-[#265eda] rounded-lg flex justify-center items-center text-white">
          <div className="w-12 h-12 bg-[#05bbc9] rounded-lg flex justify-center items-center text-white">
            <FaClipboardList className="w-6 h-6 " />
          </div>
        </div>
          <h1 className="text-3xl mt-2 font-semibold">0</h1>
          <p className="text-base">Pending orders</p></div>
        <div className="w-full md:w-72 h-52 bg-white flex flex-col justify-center items-center rounded-lg shadow-lg">
          <div className="w-12 h-12 bg-[#07cc59] rounded-lg flex justify-center items-center text-white">
          <LiaListAltSolid  className="w-8 h-8 " />
          </div>
          <h1 className="text-3xl mt-2 font-semibold">0</h1>
          <p className="text-base">Order Completed</p>
        </div>
        <div className="w-full md:w-72 h-52 bg-white flex flex-col justify-center items-center rounded-lg shadow-lg">
          <div className="w-12 h-12 bg-[#ff0000] rounded-lg flex justify-center items-center text-white">
          <IoCloseOutline className="w-8 h-8 " />
          </div>
          <h1 className="text-3xl mt-2 font-semibold">0</h1>
          <p className="text-base">Canceled Orders</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboardStatics;
