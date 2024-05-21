
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import React from "react";
import { NavLink } from "react-router-dom";

const BottomHeader = () => {
  const [openNav, setOpenNav] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navList = (
    <ul className="flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}

        color="blue-gray"
        className={`p-1 text-sm`}
      >
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "red" : "black",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/" className="flex items-center text-[#150B2BB3]">
          Home
        </NavLink>
      </Typography>
      <Typography
        as="li"
        
        placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}

        color="blue-gray"
        className={`p-1 text-sm`}
      >
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "red" : "black",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/allArt&Craft" className="flex items-center text-[#150B2BB3]">
          All Art & Craft Items
        </NavLink>
      </Typography>
      <Typography
        placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
        as="li"
        color="blue-gray"
        className={`p-1 text-sm`}
      >
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "red" : "black",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/addItem" className="flex items-center text-[#150B2BB3]">
          Add Item
        </NavLink>
      </Typography>
      <Typography
        placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
        as="li"
        color="blue-gray"
        className={`p-1 text-sm`}
      >
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "red" : "black",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/myList" className="flex items-center text-[#150B2BB3]">
          My List
        </NavLink>
      </Typography>
      <Typography
        placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
        as="li"
        color="blue-gray"
        className={`p-1 text-sm lg:hidden`}
      >
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "red" : "black",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/register" className="flex items-center text-[#150B2BB3] ">
          Register
        </NavLink>
      </Typography>
    </ul>
  );

  return (
    <div className="">
      <Navbar className="sticky  top-0 z-10  py-2 lg:px-8 lg:py-5 shadow-none rounded-none
      bg-white-[0px] border-none"
      placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Typography
            placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}

            
              as="a"
              className="mr-7 cursor-pointer py-1.5 font-medium"
            >
              <NavLink to="/">
                {/* <img src={logo} className="w-[60px] h-[60px] rounded-full" /> */}
                <p className="text-black">Ahad</p>
              </NavLink>
            </Typography>
          </div>

          <div className="flex items-center gap-4 ">
            <div className="mr-2 hidden lg:block">{navList}</div>
          </div>



          <div className="flex items-center gap-2">
           
                <>
               

                </>
              
            <IconButton 
            placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
              variant="text"
              className=" h-6 w-6 text-black hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
            <div>
            </div>
          </div>
        </div>
        <MobileNav open={openNav} className={`flex justify-start`}>{navList}</MobileNav>
      </Navbar>
    </div>
  );
};

export default BottomHeader;