import React from "react";
import { FaPlus } from "react-icons/fa";
import ReUseAbleFormModal from "../ReUseAbleFormModal/ReUseAbleFormModal";



const ReUseableAddButton = ({ title }) => {

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);
    return (
        <div className="flex justify-end items-center">
            <div onClick={handleOpen} className="flex justify-center hover:cursor-pointer items-center mt-2 mb-6 rounded-sm px-5 py-2 gap-1 text-white bg-[#265edd] hover:bg-[#1e4bb8] transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                <span className="transform transition duration-300 ease-in-out">
                    <FaPlus />
                </span>
                <span>{title}</span>
            </div>
           <div>
            <ReUseAbleFormModal open={open} handleOpen={handleOpen}/>
           </div>
        </div>
    );
};

export default ReUseableAddButton;