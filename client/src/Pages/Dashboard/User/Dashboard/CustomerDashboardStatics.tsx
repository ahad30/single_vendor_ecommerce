import { CiBoxList } from "react-icons/ci";
const CustomerDashboardStatics = () => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-x-2 gap-y-8">
        <div className="w-64 h-48 bg-white flex flex-col justify-center items-center rounded-lg">
          <div className="w-12 h-10 bg-[#265eda] rounded-lg flex justify-center items-center text-white">
            <CiBoxList className="w-8 h-8 " />
          </div>
          <h1 className="text-2xl mt-2 font-bold">0 </h1>
          <p className="text-lg">All orders</p>
        </div>
        <div className="w-64 h-48 bg-white flex flex-col justify-center items-center rounded-lg"> <div className="w-12 h-10 bg-[#265eda] rounded-lg flex justify-center items-center text-white">
          <CiBoxList className="w-8 h-8 " />
        </div>
          <h1 className="text-2xl mt-2 font-bold">0 </h1>
          <p className="text-lg">All orders</p></div>
        <div className="w-64 h-48 bg-white flex flex-col justify-center items-center rounded-lg">
          <div className="w-12 h-10 bg-[#265eda] rounded-lg flex justify-center items-center text-white">
            <CiBoxList className="w-8 h-8 " />
          </div>
          <h1 className="text-2xl mt-2 font-bold">0 </h1>
          <p className="text-lg">All orders</p>
        </div>
        <div className="w-64 h-48 bg-white flex flex-col justify-center items-center rounded-lg">
          <div className="w-12 h-10 bg-[#265eda] rounded-lg flex justify-center items-center text-white">
            <CiBoxList className="w-8 h-8 " />
          </div>
          <h1 className="text-2xl mt-2 font-bold">0 </h1>
          <p className="text-lg">All orders</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboardStatics;
