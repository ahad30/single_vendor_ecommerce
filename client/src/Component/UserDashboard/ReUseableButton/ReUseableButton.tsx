

const ReUseableButton = ({ title }) => {
    return (
        <div className="flex justify-end items-center">
            {/* <div className="bg-[#265eda] hover:cursor-pointer text-white py-3 px-6 rounded-sm hover:bg-[#1e4eb7] transition duration-300 ease-in-out">
               <span> {title}</span>
            </div> */}
            <div className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-[#265eda] group-hover:from-cyan-500 group-hover:to-[#265eda] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    {title}
                </span>
            </div>
        </div>
    );
};

export default ReUseableButton;

