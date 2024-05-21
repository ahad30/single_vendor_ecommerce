// import React from 'react'

import { Link } from "react-router-dom";
import BottomHeader from "./BottomHeader";
import TopHeader from "./TopHeader";
import { MdOutlineArrowRightAlt } from "react-icons/md";

const Header = () => {
  return (
    <>
     <div className="bg-secondary py-2 hidden lg:block">
      <div className="flex justify-center items-center max-w-7xl mx-auto">
        {/* text part */}
        <div className=" flex gap-x-10 items-center">
          <p className="text-white font-medium text-[15px] ">
            Welcome to our international shop! Enjoy free shipping on orders
            $100 & up
          </p>
          <p className="text-[#FF0935] flex items-center gap-x-1 border-b border-[#FF0935] text-xs font-bold">
            <Link to={"#"}>Shop now</Link>{" "}
            <MdOutlineArrowRightAlt size={17}></MdOutlineArrowRightAlt>
          </p>
        </div>
      
         
        </div>
      </div>
  
    <div className="lg:px-7 max-w-7xl mx-auto">
    <TopHeader></TopHeader>
     </div>
    <div className="lg:px-7 max-w-7xl mx-auto">
   <BottomHeader></BottomHeader>
    </div>
    </>
    
  );
};

export default Header;
