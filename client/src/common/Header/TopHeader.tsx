
// import { CiSearch } from "react-icons/ci";
import { Button } from "@material-tailwind/react";
import { HiMiniBars3 } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

const TopHeader = () => {
  return (
  <section className="max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center">
    {/* heading */}
    <div className="">
      <h2 className="font-semibold text-xl">
        <span className="text-primary">Z8</span> eComerce
      </h2>
    </div>

    <div className="bg-[#EAE5E591] flex items-center gap-2 py-3 px-4 rounded-md">
    <HiMiniBars3 className="text-[#2222228C]"/>
    <p className="font-normal text-[#2222228C] text-sm">Shop by Category</p>
    </div>
    {/* searchBar */}
    <div className="relative w-[35%] h-[42px] my-12 flex">
      <div className="w-full">
        <label htmlFor="Search" className="sr-only">
          Search
        </label>
        <form className="" action="">
          <input
            type="text"
            id="Search"
            name="search"
            placeholder="Search Products..."
            className="w-full bg-[#FEFBFB] px-4 outline-none rounded-md py-2 border-primary border-[0.5px] pe-10 shadow-sm sm:text-sm"
          />
        </form>

        <div className="absolute -end-2 bg-primary px-4 -top-0 bottom-0 flex justify-center items-center rounded-r-md  h-[38px]">
          <IoSearch
            className="cursor-pointer  text-white"
            size={20}
          ></IoSearch>
        </div>
      
      </div>
    </div>
    <div className="flex items-center space-x-2">
                   
                         {/* user */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
                   <Link to={`/login`}>
                    <p className="text-sm">Login</p>
                   </Link> 
                    
                     /
                     
                    <Link to={`/register`}>
                   <p className="text-sm">Register</p>
                    </Link>

                  </div>
    {/* card icon */}
    <div className="flex gap-x-2 items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        />
      </svg>
      {/* love */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>


    </div>
  </div>
  </section>
  )
}

export default TopHeader;